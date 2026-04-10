export interface ScanResult {
  status: "Safe" | "Medium Risk" | "Risky";
  score: number;
  reasons: { text: string; severity: "low" | "medium" | "high" }[];
  explanations: string;
}

const KEYWORDS: { pattern: RegExp; label: string; weight: number; severity: "low" | "medium" | "high"; reason: string }[] = [
  { pattern: /\bSMS\b/gi, label: "SMS", weight: 2, severity: "high", reason: "References to SMS messaging detected" },
  { pattern: /\bOTP\b/gi, label: "OTP", weight: 2, severity: "high", reason: "OTP/one-time-password handling detected" },
  { pattern: /\bpassword\b/gi, label: "password", weight: 2, severity: "high", reason: "Password-related strings found" },
  { pattern: /\btoken\b/gi, label: "token", weight: 1, severity: "medium", reason: "Authentication token references detected" },
  { pattern: /https?:\/\/[^\s"']+/gi, label: "URL", weight: 1, severity: "medium", reason: "Embedded URLs/network endpoints found" },
  { pattern: /\broot\b/gi, label: "root", weight: 2, severity: "high", reason: "Root access references detected" },
  { pattern: /\badmin\b/gi, label: "admin", weight: 1, severity: "medium", reason: "Admin privilege references found" },
  { pattern: /\bcrypto\b/gi, label: "crypto", weight: 1, severity: "medium", reason: "Cryptographic operations detected" },
  { pattern: /\bkeylog/gi, label: "keylogger", weight: 3, severity: "high", reason: "Potential keylogger indicators found" },
  { pattern: /\bpermission\b/gi, label: "permission", weight: 1, severity: "low", reason: "Permission request strings found" },
];

export function scanApkContent(text: string, fileName: string): ScanResult {
  const reasons: ScanResult["reasons"] = [];
  let totalWeight = 0;

  for (const kw of KEYWORDS) {
    const matches = text.match(kw.pattern);
    if (matches && matches.length > 0) {
      totalWeight += kw.weight * Math.min(matches.length, 5);
      reasons.push({ text: `${kw.reason} (${matches.length} occurrence${matches.length > 1 ? "s" : ""})`, severity: kw.severity });
    }
  }

  const score = Math.min(Math.round(totalWeight), 10);

  let status: ScanResult["status"];
  if (score <= 2) status = "Safe";
  else if (score <= 5) status = "Medium Risk";
  else status = "Risky";

  const explanationMap = {
    Safe: `Analysis of "${fileName}" found minimal suspicious content. The file appears relatively clean based on keyword analysis.`,
    "Medium Risk": `"${fileName}" contains some concerning patterns including references to sensitive operations. Exercise caution before installing.`,
    Risky: `⚠️ "${fileName}" contains multiple high-risk indicators such as SMS interception, password handling, or root access. Installing this APK is strongly discouraged.`,
  };

  if (reasons.length === 0) {
    reasons.push({ text: "No suspicious keywords detected", severity: "low" });
  }

  return { status, score, reasons, explanations: explanationMap[status] };
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string ?? "");
    reader.onerror = () => resolve("");
    reader.readAsText(file, "latin1");
  });
}
