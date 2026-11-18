import assert from "node:assert/strict";
import { test } from "node:test";

const dev = process.env.LAB_DEV_URL || "http://127.0.0.1:4321";

test("development preview renders the lab and its draft entry", {
  skip: !process.env.PLAYWRIGHT_MODULE,
}, async () => {
  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const errors = [];
  try {
    await context.route("**/*", route => route.request().url().startsWith(`${dev}/`) ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`${dev}/lab/`, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, "the development lab index should exist");
    assert.equal(await page.locator("main h1").textContent(), "In the lab");
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow");
    const entry = page.getByRole("link", { name: "Giving my old gaming PC a second job" });
    await entry.click();
    await page.waitForURL(`${dev}/lab/old-pc-ai-server/`);
    assert.equal(await page.locator("main h1").textContent(), "Giving my old gaming PC a second job");
    assert.match(await page.locator("article").textContent(), /reasoning had consumed/);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow");
    assert.equal(await page.getByText("Draft", { exact: true }).count(), 1);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.equal(await page.locator("main h1").isVisible(), true);
    }
    await page.getByRole("link", { name: "All lab notes" }).click();
    await page.waitForURL(`${dev}/lab/`);
    await page.goto(`${dev}/`, { waitUntil: "networkidle" });
    assert.equal(await page.locator('a[href^="/lab"]').count(), 0, "the unreleased lab should not appear on the homepage or navigation");
    assert.deepEqual(errors, []);
  } finally {
    await context.close();
    await browser.close();
  }
});

test("production preview does not serve the lab at direct URLs", {
  skip: !process.env.LAB_PRODUCTION_URL,
}, async () => {
  const production = process.env.LAB_PRODUCTION_URL;
  for (const path of ["/lab/", "/lab/old-pc-ai-server/"]) {
    const response = await fetch(`${production}${path}`);
    assert.equal(response.status, 404, `${path} must not be available in production`);
    assert.doesNotMatch(await response.text(), /Giving my old gaming PC a second job/);
  }
  const home = await fetch(`${production}/`);
  assert.equal(home.status, 200);
  assert.doesNotMatch(await home.text(), /href=["']\/lab(?:\/|["'])/);
  const sitemap = await fetch(`${production}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.doesNotMatch(await sitemap.text(), /\/lab(?:\/|<)/);
});
