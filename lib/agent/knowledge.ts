import fs from "fs";
import path from "path";

export function getKnowledgeBase() {
  const filePath = path.join(process.cwd(), "knowledge", "educanology-base.md");

  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Could not read knowledge base:", error);
    return "";
  }
}