const BRAND_PALETTE = [
  { bg: "#2e7d32", fg: "#ffffff", border: "1px solid #1b5e20" }, // dark green
  { bg: "#4caf50", fg: "#ffffff", border: "1px solid #2e7d32" }, // primary green
  { bg: "#81c784", fg: "#0b3d0b", border: "1px solid #66bb6a" }, // light green
  { bg: "#ffffff", fg: "#2e7d32", border: "1px solid #c8e6c9" }, // white with green text
];

export function getInitialsFromEmail(email) {
  if (!email || typeof email !== "string") return "U";
  const local = email.split("@")[0] || "";
  const cleaned = local.replace(/[^a-zA-Z]/g, "").toUpperCase();
  if (!cleaned) return "U";
  return cleaned.slice(0, 2).padEnd(2, cleaned[0] || "U");
}

export function getInitialsFromName(name) {
  if (!name || typeof name !== "string") return "U";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.replace(/[^a-zA-Z]/g, ""))
    .filter(Boolean);
  const first = (parts[0] || "U").charAt(0).toUpperCase();
  const second = (parts[1] || parts[0] || "U").charAt(0).toUpperCase();
  return (first + second).slice(0, 2);
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function pickBrandColors(seed) {
  const index = hashString(String(seed || "thrive360")) % BRAND_PALETTE.length;
  const choice = BRAND_PALETTE[index];
  return {
    backgroundColor: choice.bg,
    color: choice.fg,
    border: choice.border,
  };
}



