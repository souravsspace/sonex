import associations from "@/vscode-icons.json";

interface IconEntry {
  color: string;
  icon: string;
}

const FALLBACK_ICON: IconEntry = { icon: "file", color: "#90a4ae" };

const map = associations as Record<string, IconEntry>;

function getIconForFile(filename: string): IconEntry {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const lower = filename.toLowerCase();

  if (lower === "dockerfile") {
    return map.dockerfile ?? FALLBACK_ICON;
  }
  if (lower === ".gitignore" || lower === "gitignore") {
    return map.gitignore ?? FALLBACK_ICON;
  }
  if (lower === ".env" || lower.startsWith(".env.")) {
    return map.env ?? FALLBACK_ICON;
  }

  return map[ext] ?? FALLBACK_ICON;
}

function getIconForLanguage(languageId: string): IconEntry {
  return map[languageId.toLowerCase()] ?? FALLBACK_ICON;
}

export { FALLBACK_ICON, getIconForFile, getIconForLanguage };
export type { IconEntry };
