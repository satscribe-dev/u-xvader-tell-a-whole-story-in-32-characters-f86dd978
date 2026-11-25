// Tell a Whole Story in 32 Characters — entry writer.
//
// The entry is one Wi-Fi network name, at most 32 characters, that lands a
// joke and implies a whole story in the few words a passer-by sees in a
// phone's network list.
//
// Chosen name: "SheTookTheKidsNotThePassword" (28 characters).
//   She took the kids, not the password.
// The joke is a misdirection: a divorce split is listed — kids, the big
// prize — and then the twist: the one thing she did NOT take is the Wi-Fi
// password, so the password was the contested prize all along. One read,
// no explanation needed: a character (she), a situation (the split), and
// something that happened (she took the kids and left him the password).
// It is fresh (not one of the stock Wi-Fi jokes) and every character earns
// its place; it is also true of the network itself only in the sense that
// the password is what stands between a stranger and this network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "SheTookTheKidsNotThePassword";

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 32) {
    throw new Error(`entry must be 1-32 characters, got ${chars.length}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Exactly the entry, no trailing newline: the gate counts characters.
  writeFileSync(outPath, ENTRY, "utf8");
  // Read it back and fail loudly rather than ship a partial write.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error(`verify failed: wrote ${JSON.stringify(written)}`);
  }
  console.log(`wrote ${outPath} (${chars.length} characters)`);
}

main();
