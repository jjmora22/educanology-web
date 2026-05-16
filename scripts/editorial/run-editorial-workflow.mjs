import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../..");

const defaultProposalPath = path.join(
  projectRoot,
  "content/editorial-proposals/sample-topic-proposals.json"
);
const inputProposalPath = process.argv[2]
  ? path.resolve(projectRoot, process.argv[2])
  : defaultProposalPath;
const isDefaultInput = inputProposalPath === defaultProposalPath;
const inputBaseName = path.basename(inputProposalPath, ".json");
const outputBaseName = isDefaultInput
  ? "sample-draft-package"
  : slugify(inputBaseName || "editorial-workflow");
const reviewOutputBaseName = isDefaultInput
  ? "sample-review-packet"
  : slugify(inputBaseName || "editorial-workflow");

const reviewOutputPath = path.join(
  projectRoot,
  `content/editorial-review-packets/${reviewOutputBaseName}.md`
);
const draftMarkdownOutputPath = path.join(
  projectRoot,
  `content/editorial-draft-packages/${outputBaseName}.md`
);
const draftJsonOutputPath = path.join(
  projectRoot,
  `content/editorial-draft-packages/${outputBaseName}.json`
);

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runStep(label, scriptPath) {
  console.log(`\n${label}`);

  const args = [scriptPath];
  if (!isDefaultInput) args.push(path.relative(projectRoot, inputProposalPath));

  const result = spawnSync(process.execPath, args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    console.error(`${label} failed with exit code ${result.status}.`);
    process.exit(result.status || 1);
  }
}

function getNextAction(batch) {
  const selection = batch.humanSelection;

  if (selection?.decision === "approved") {
    return "Gerar e rever o pacote final antes de qualquer publicação manual ou assistida.";
  }

  if (selection?.decision === "selected") {
    return "Confirmar a seleção humana, rever fontes e aprovar ou pedir ajustes ao pacote editorial.";
  }

  if (batch.selectedProposalId) {
    return "Confirmar a proposta selecionada, validar fontes e aprovar o ângulo editorial.";
  }

  return "Daniel ou Juan José deve selecionar uma proposta, aprovar o ângulo ou pedir nova pesquisa.";
}

if (!fs.existsSync(inputProposalPath)) {
  console.error("Editorial workflow failed: proposal input file not found.");
  console.error(inputProposalPath);
  process.exit(1);
}

let batch;

try {
  batch = readJson(inputProposalPath);
} catch (error) {
  console.error("Editorial workflow failed: proposal input file is not valid JSON.");
  console.error(error.message);
  process.exit(1);
}

console.log("Educanology editorial workflow");
console.log(`Input proposal file: ${inputProposalPath}`);

runStep(
  "Generating review packet...",
  "scripts/editorial/generate-review-packet.mjs"
);
runStep(
  "Generating draft package...",
  "scripts/editorial/generate-draft-package.mjs"
);

console.log("\nEditorial workflow completed.");
console.log(`Review packet: ${reviewOutputPath}`);
console.log(`Draft package Markdown: ${draftMarkdownOutputPath}`);
console.log(`Draft package JSON: ${draftJsonOutputPath}`);
console.log(`Next recommended human action: ${getNextAction(batch)}`);
