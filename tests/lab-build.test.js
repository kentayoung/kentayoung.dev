import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { test } from "node:test";

const output = resolve(process.env.LAB_BUILD_DIR || "dist");

test("production build omits the unreleased lab, including direct entry URLs", () => {
  assert.ok(existsSync(join(output, "index.html")), "run npm run build first");
  assert.equal(existsSync(join(output, "lab")), false, "unreleased lab pages must not be emitted");
  const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
  assert.doesNotMatch(sitemap, /\/lab(?:\/|<)/);
  for (const file of readdirSync(output, { recursive: true }).filter(file => file.endsWith(".html"))) {
    const html = readFileSync(join(output, file), "utf8");
    assert.doesNotMatch(html, /href=["']\/lab(?:\/|["'])/, `${file} must not link to the hidden lab`);
    assert.doesNotMatch(html, /Giving my old gaming PC a second job/, `${file} must not contain draft content`);
  }
});
