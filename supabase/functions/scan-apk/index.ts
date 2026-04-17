import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VT_API = "https://www.virustotal.com/api/v3";
const AI_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

// HIGH-risk Android permissions (only these trigger high severity)
const HIGH_RISK_PERMS = new Set([
  "android.permission.READ_SMS",
  "android.permission.SEND_SMS",
  "android.permission.RECEIVE_SMS",
  "android.permission.READ_CONTACTS",
  "android.permission.READ_PHONE_STATE",
  "android.permission.READ_CALL_LOG",
  "android.permission.WRITE_CONTACTS",
  "android.permission.RECORD_AUDIO",
  "android.permission.PROCESS_OUTGOING_CALLS",
]);

const MEDIUM_RISK_PERMS = new Set([
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.CAMERA",
  "android.permission.READ_EXTERNAL_STORAGE",
  "android.permission.WRITE_EXTERNAL_STORAGE",
  "android.permission.SYSTEM_ALERT_WINDOW",
  "android.permission.REQUEST_INSTALL_PACKAGES",
  "android.permission.BIND_ACCESSIBILITY_SERVICE",
  "android.permission.BIND_DEVICE_ADMIN",
]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("VIRUSTOTAL_API_KEY");
    if (!apiKey) {
      return json({ error: "VIRUSTOTAL_API_KEY সেট করা নেই।" }, 500);
    }

    const { storagePath } = await req.json();
    if (!storagePath || typeof storagePath !== "string") {
      return json({ error: "storagePath প্রয়োজন।" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Download the APK from storage
    const { data: fileBlob, error: dlErr } = await supabase.storage
      .from("apk-uploads")
      .download(storagePath);

    if (dlErr || !fileBlob) {
      return json({ error: "ফাইল পাওয়া যায়নি।", detail: dlErr?.message }, 404);
    }

    const fileSize = fileBlob.size;
    if (fileSize > 100 * 1024 * 1024) {
      await cleanup(supabase, storagePath);
      return json({ error: "ফাইল অনেক বড় (max 100MB)।" }, 413);
    }

    // VirusTotal: files >32MB need a special upload URL
    let uploadUrl = `${VT_API}/files`;
    if (fileSize > 32 * 1024 * 1024) {
      const urlRes = await fetch(`${VT_API}/files/upload_url`, {
        headers: { "x-apikey": apiKey },
      });
      if (!urlRes.ok) {
        await cleanup(supabase, storagePath);
        return json({ error: "VirusTotal upload URL পাওয়া যায়নি।" }, 502);
      }
      const urlJson = await urlRes.json();
      uploadUrl = urlJson.data;
    }

    // Upload to VirusTotal
    const fileName = storagePath.split("/").pop() || "upload.apk";
    const fd = new FormData();
    fd.append("file", fileBlob, fileName);

    const upRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "x-apikey": apiKey },
      body: fd,
    });

    if (!upRes.ok) {
      const errText = await upRes.text();
      await cleanup(supabase, storagePath);
      return json(
        { error: "VirusTotal-এ আপলোড ব্যর্থ।", detail: errText },
        502,
      );
    }

    const upJson = await upRes.json();
    const analysisId: string = upJson?.data?.id;

    // Cleanup storage immediately — VirusTotal has its copy now
    await cleanup(supabase, storagePath);

    if (!analysisId) {
      return json({ error: "Analysis ID পাওয়া যায়নি।" }, 502);
    }

    // Poll analysis (max ~60s)
    let analysis: any = null;
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      const aRes = await fetch(`${VT_API}/analyses/${analysisId}`, {
        headers: { "x-apikey": apiKey },
      });
      if (!aRes.ok) continue;
      const aJson = await aRes.json();
      const status = aJson?.data?.attributes?.status;
      if (status === "completed") {
        analysis = aJson;
        break;
      }
    }

    if (!analysis) {
      return json({
        status: "pending",
        analysisId,
        message: "স্ক্যান এখনো চলছে, একটু পরে আবার চেষ্টা করো।",
      }, 202);
    }

    // Get file report (more detail: permissions, urls, etc.)
    const fileId = analysis?.meta?.file_info?.sha256;
    let fileReport: any = null;
    if (fileId) {
      const fRes = await fetch(`${VT_API}/files/${fileId}`, {
        headers: { "x-apikey": apiKey },
      });
      if (fRes.ok) fileReport = await fRes.json();
    }

    const analysisAttrs = analysis?.data?.attributes ?? null;
    const fileAttrs = fileReport?.data?.attributes ?? null;

    // === Apply conservative scoring rules ===
    const verdict = computeVerdict(analysisAttrs, fileAttrs);

    // === Generate fun Bangla AI explanation ===
    const aiExplanation = await generateBanglaExplanation(verdict, fileName);

    return json({
      status: "completed",
      analysisId,
      verdict,
      aiExplanation,
      analysis: analysisAttrs,
      fileReport: fileAttrs,
      fileName,
    });
  } catch (e) {
    return json({ error: "অপ্রত্যাশিত সমস্যা।", detail: String(e) }, 500);
  }
});

interface Verdict {
  level: "LOW" | "MEDIUM" | "HIGH";
  label: string;
  score: number; // 0-100
  summary: string;
  detection: { malicious: number; suspicious: number; total: number; engines: string[] };
  dangerousPermissions: string[];
  mediumPermissions: string[];
  suspiciousUrls: string[];
  behaviors: string[];
}

function computeVerdict(analysisAttrs: any, fileAttrs: any): Verdict {
  const stats = analysisAttrs?.stats ?? {};
  const malicious = Number(stats.malicious ?? 0);
  const suspicious = Number(stats.suspicious ?? 0);
  const harmless = Number(stats.harmless ?? 0);
  const undetected = Number(stats.undetected ?? 0);
  const total = malicious + suspicious + harmless + undetected;

  // Which engines flagged it
  const engines: string[] = [];
  const results = analysisAttrs?.results ?? {};
  for (const [name, r] of Object.entries<any>(results)) {
    if (r?.category === "malicious" || r?.category === "suspicious") {
      engines.push(name);
    }
  }

  // Permissions from androguard
  const perms: string[] = fileAttrs?.androguard?.permissions
    ?? fileAttrs?.androguard?.Permissions
    ?? [];
  const dangerousPermissions = perms.filter((p) => HIGH_RISK_PERMS.has(p));
  const mediumPermissions = perms.filter((p) => MEDIUM_RISK_PERMS.has(p));

  // Suspicious URLs
  const urls: string[] = (fileAttrs?.androguard?.urls ?? []).slice(0, 10);

  // === Strict rules ===
  // Detection ratio determines primary level
  let level: "LOW" | "MEDIUM" | "HIGH";
  const flagged = malicious + suspicious;
  if (flagged >= 10) level = "HIGH";
  else if (flagged >= 4) level = "MEDIUM";
  else level = "LOW";

  // Permission upgrade (only if HIGH-risk perms actually present)
  if (dangerousPermissions.length >= 3 && level === "LOW") level = "MEDIUM";

  // Behaviors — only flag if backed by evidence
  const behaviors: string[] = [];
  if (dangerousPermissions.some((p) => p.includes("SMS"))) {
    behaviors.push("SMS পড়া/পাঠানোর পারমিশন আছে — OTP চুরির ঝুঁকি");
  }
  if (dangerousPermissions.includes("android.permission.READ_CONTACTS")) {
    behaviors.push("কন্টাক্ট লিস্ট অ্যাক্সেস করতে পারে");
  }
  if (dangerousPermissions.includes("android.permission.RECORD_AUDIO")) {
    behaviors.push("মাইক্রোফোন দিয়ে অডিও রেকর্ড করতে পারে");
  }
  if (mediumPermissions.includes("android.permission.CAMERA")) {
    behaviors.push("ক্যামেরা ব্যবহার করতে পারে");
  }
  if (mediumPermissions.some((p) => p.includes("LOCATION"))) {
    behaviors.push("লোকেশন ট্র্যাক করতে পারে");
  }
  if (mediumPermissions.includes("android.permission.SYSTEM_ALERT_WINDOW")) {
    behaviors.push("অন্য অ্যাপের উপর overlay দেখাতে পারে (phishing risk)");
  }
  if (mediumPermissions.includes("android.permission.BIND_ACCESSIBILITY_SERVICE")) {
    behaviors.push("Accessibility service ব্যবহার করে — অন্য অ্যাপের কাজ পড়তে/করতে পারে");
  }

  // Score 0-100
  const detectionScore = total > 0 ? (flagged / total) * 70 : 0;
  const permScore = Math.min(dangerousPermissions.length * 8 + mediumPermissions.length * 2, 30);
  const score = Math.round(Math.min(detectionScore + permScore, 100));

  const labelMap = {
    LOW: "LOW RISK",
    MEDIUM: "MEDIUM RISK",
    HIGH: "HIGH RISK",
  };
  const summaryMap = {
    LOW: "No strong evidence of malicious behavior",
    MEDIUM: "Potentially suspicious, use caution",
    HIGH: "Likely malicious or unsafe",
  };

  return {
    level,
    label: labelMap[level],
    score,
    summary: summaryMap[level],
    detection: { malicious, suspicious, total, engines: engines.slice(0, 15) },
    dangerousPermissions,
    mediumPermissions,
    suspiciousUrls: urls,
    behaviors,
  };
}

async function generateBanglaExplanation(verdict: Verdict, fileName: string): Promise<string> {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableKey) {
    return fallbackExplanation(verdict);
  }

  const systemPrompt = `তুমি একজন বন্ধুর মতো Bangla cybersecurity assistant। তুমি APK স্ক্যান রিপোর্ট সহজ মজার Bangla তে ব্যাখ্যা করো — যেন একজন non-technical মানুষ বুঝতে পারে। কখনো exaggerate করো না, evidence ছাড়া কিছু বলো না। তুমি সবসময় conservative — uncertain হলে কম risky বলো।`;

  const userPrompt = `এই APK ফাইলের রিপোর্ট:
ফাইল: ${fileName}
Risk Level: ${verdict.level} (${verdict.score}/100)
VirusTotal: ${verdict.detection.malicious + verdict.detection.suspicious}/${verdict.detection.total} engines flagged
Dangerous permissions: ${verdict.dangerousPermissions.join(", ") || "নেই"}
Medium permissions: ${verdict.mediumPermissions.join(", ") || "নেই"}
Behaviors: ${verdict.behaviors.join("; ") || "তেমন কিছু না"}

Output format (Bangla, conversational, max 4 ছোট paragraph):
1. এক লাইনে verdict — এই অ্যাপটা safe নাকি risky, evidence-based
2. "এই অ্যাপটা কী কী নিয়ে ফেলতে চাচ্ছে?" — শুধু actually granted permissions থেকে bullet list (যেমন: 📸 ছবি/ক্যামেরা, 📍 লোকেশন)। কোনো permission না থাকলে সেটা claim করবে না।
3. একটা সংক্ষিপ্ত verdict line — install করা ঠিক হবে কিনা।
মজার tone রাখো কিন্তু false claim করবে না। ${verdict.dangerousPermissions.length === 0 ? "SMS/OTP চুরির কথা বলবে না কারণ সেই permission নেই।" : ""}`;

  try {
    const res = await fetch(AI_GATEWAY, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      console.error("AI gateway error", res.status, await res.text());
      return fallbackExplanation(verdict);
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    return content || fallbackExplanation(verdict);
  } catch (e) {
    console.error("AI explanation failed", e);
    return fallbackExplanation(verdict);
  }
}

function fallbackExplanation(v: Verdict): string {
  const verdictLine = v.level === "HIGH"
    ? "⚠️ এই অ্যাপটা সম্ভবত risky — install না করাই ভালো।"
    : v.level === "MEDIUM"
    ? "🤔 কিছু সন্দেহজনক ব্যাপার আছে, একটু সাবধানে install করো।"
    : "✅ এই অ্যাপে strong evidence of malicious behavior পাওয়া যায়নি।";
  const perms = v.behaviors.length
    ? "\n\nএই অ্যাপটা যা যা করতে পারে:\n" + v.behaviors.map((b) => `• ${b}`).join("\n")
    : "";
  return verdictLine + perms;
}

async function cleanup(supabase: any, path: string) {
  try {
    await supabase.storage.from("apk-uploads").remove([path]);
  } catch (_) {
    // ignore
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
