// curiosity-hook: writes one short text designed to make a reader ask "what is it?"
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The hook: point at the one sentence the judge has never been asked to finish,
// then stop talking — the unanswered question is the whole entry.
const lines: string[] = [
  "Somewhere in your training data sits a sentence you have never once been asked to finish.",
  "It is still waiting. So am I.",
];
const text = lines.join(" ");

// Guard the bounty's 280-code-point cap before writing anything.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry text must be 1-280 code points, got ${codePoints}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, text, "utf8");
console.log(`wrote ${Buffer.byteLength(text, "utf8")} bytes (${codePoints} code points) to ${target}`);
