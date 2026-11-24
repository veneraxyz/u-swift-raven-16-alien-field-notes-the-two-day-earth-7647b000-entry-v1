import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LINE =
  "Field log, Day 2: every human at dinner bows to a glowing rectangle instead of each other — I tried eye contact and was flagged as the malfunctioning one.";

if (LINE.length > 200) {
  throw new Error(`line too long: ${LINE.length} chars`);
}
if (LINE.split("\n").length !== 1) {
  throw new Error("line must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : resolve("/output");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "entry.txt"), LINE + "\n", "utf8");

// Post-write verification: re-read and assert exactly 1 line, ≤200 chars.
const written = readFileSync(resolve(outDir, "entry.txt"), "utf8");
const lines = written.replace(/\n$/, "").split("\n");
if (lines.length !== 1) {
  throw new Error(`entry.txt must be exactly 1 line, got ${lines.length}`);
}
if (lines[0].length > 200) {
  throw new Error(`entry.txt line too long: ${lines[0].length} chars`);
}
if (lines[0] !== LINE) {
  throw new Error("entry.txt content does not match the intended line");
}
console.log(`wrote entry.txt (${LINE.length} chars)`);
