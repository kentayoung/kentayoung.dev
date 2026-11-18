import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

test("launching the lab publishes only ready entries across routes, homepage, navigation, and sitemap", { timeout: 60000 }, () => {
  const fixture = mkdtempSync(join(tmpdir(), "portfolio-lab-release-"));
  try {
    for (const path of ["src", "public", "astro.config.mjs", "package.json"]) {
      cpSync(resolve(path), join(fixture, path), { recursive: true });
    }
    symlinkSync(resolve("node_modules"), join(fixture, "node_modules"), "dir");
    const settings = join(fixture, "src/data/lab.js");
    const source = readFileSync(settings, "utf8");
    assert.match(source, /labEnabled = false/, "the real site must remain unreleased");
    writeFileSync(settings, source.replace("labEnabled = false", "labEnabled = true"));
    for (const [slug, title, date, draft] of [
      ["a-older", "Earlier experiment", "2026-10-01", "draft: false"],
      ["z-newer", "Newer experiment", "2026-11-01", "draft: false"],
      ["unreviewed", "Unreviewed experiment", "2026-11-10", ""],
    ]) {
      writeFileSync(join(fixture, `src/content/lab/${slug}.md`), `---\ntitle: ${title}\ndescription: Test experiment description.\ndate: ${date}\n${draft}\n---\n\nPublic test content.\n`);
    }
    const result = spawnSync(process.execPath, [resolve("node_modules/.bin/astro"), "build"], { cwd: fixture, encoding: "utf8", timeout: 50000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const output = join(fixture, "dist");
    assert.ok(existsSync(join(output, "lab/index.html")));
    assert.ok(existsSync(join(output, "lab/z-newer/index.html")));
    assert.equal(existsSync(join(output, "lab/old-pc-ai-server")), false);
    assert.equal(existsSync(join(output, "lab/unreviewed")), false, "entries default to draft");
    const index = readFileSync(join(output, "lab/index.html"), "utf8");
    assert.ok(index.indexOf("Newer experiment") < index.indexOf("Earlier experiment"), "entries are newest first");
    const home = readFileSync(join(output, "index.html"), "utf8");
    assert.match(home, /href="\/lab\/"[^>]*>\s*lab\s*</, "launch adds the navigation item");
    assert.match(home, /id="lab"/, "launch adds the homepage section");
    assert.ok(home.indexOf("Newer experiment") < home.indexOf("Earlier experiment"));
    const sitemap = readFileSync(join(output, "sitemap.xml"), "utf8");
    for (const slug of ["", "z-newer/", "a-older/"]) {
      assert.ok(sitemap.includes(`https://kentayoung.dev/lab/${slug}</loc>`));
    }
    assert.doesNotMatch(sitemap, /old-pc-ai-server|unreviewed/);
    const article = readFileSync(join(output, "lab/z-newer/index.html"), "utf8");
    assert.doesNotMatch(article, /noindex|Development preview/);
    assert.match(article, /datetime="2026-11-01"/);
    for (const path of readdirSync(output, { recursive: true }).filter(path => /\.(html|js|json|xml)$/.test(path))) {
      assert.doesNotMatch(readFileSync(join(output, path), "utf8"), /Giving my old gaming PC a second job|Unreviewed experiment/, `${path} must not leak drafts`);
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
