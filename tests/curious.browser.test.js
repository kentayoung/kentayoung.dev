import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.ANALYTICS_PREVIEW_URL || "http://127.0.0.1:4321";

test("homepage curiosity list is readable across motion preferences and mobile", {
  skip: !process.env.PLAYWRIGHT_MODULE,
}, async () => {
  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE);
  const browser = await chromium.launch({ headless: true });
  try {
    for (const variant of [
      { width: 1440, reducedMotion: "no-preference", javaScriptEnabled: true },
      { width: 390, reducedMotion: "reduce", javaScriptEnabled: true },
      { width: 390, reducedMotion: "no-preference", javaScriptEnabled: false },
    ]) {
      const context = await browser.newContext({
        viewport: { width: variant.width, height: 900 },
        reducedMotion: variant.reducedMotion,
        javaScriptEnabled: variant.javaScriptEnabled,
      });
      await context.route("**/*", route => route.request().url().startsWith(`${base}/`) ? route.continue() : route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(base, { waitUntil: "networkidle" });
      const section = page.locator("#curious");
      assert.equal(await section.count(), 1, "homepage includes the curiosity section");
      assert.equal(await section.locator("h2").textContent(), "What I'm curious about");
      assert.deepEqual(await section.locator("dt").allTextContents(), [
        "AI agents & Hermes Agent", "AI-assisted engineering", "Home server", "Automation",
      ]);
      assert.match(await section.textContent(), /old gaming PC.*self-hosted tools, AI agents, and local LLMs/);
      if (variant.javaScriptEnabled && variant.reducedMotion === "no-preference") {
        await section.evaluate(element => element.scrollIntoView({ behavior: "instant" }));
        await page.waitForTimeout(80);
        assert.equal(await section.evaluate(element => element.getAnimations({ subtree: true }).length), 0);
      }
      await section.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll("#curious .curious-row")].every(row => getComputedStyle(row).opacity === "1"));
      const layout = await section.locator(".curious-row").first().evaluate(row => {
        const term = row.querySelector("dt").getBoundingClientRect();
        const description = row.querySelector("dd").getBoundingClientRect();
        return { stacked: description.top >= term.bottom, right: row.getBoundingClientRect().right, animation: getComputedStyle(row).animationName };
      });
      assert.equal(layout.stacked, variant.width < 900);
      assert.ok(layout.right <= variant.width);
      if (variant.reducedMotion === "reduce") assert.equal(layout.animation, "none");
      assert.deepEqual(errors, []);
      await context.close();
    }
  } finally {
    await browser.close();
  }
});
