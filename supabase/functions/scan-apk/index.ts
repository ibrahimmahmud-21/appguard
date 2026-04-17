import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VT_API = "https://www.virustotal.com/api/v3";

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

    return json({
      status: "completed",
      analysisId,
      analysis: analysis?.data?.attributes ?? null,
      fileReport: fileReport?.data?.attributes ?? null,
      fileName,
    });
  } catch (e) {
    return json({ error: "অপ্রত্যাশিত সমস্যা।", detail: String(e) }, 500);
  }
});

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
