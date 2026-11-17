import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.ANALYTICS_PREVIEW_URL || "http://127.0.0.1:4321";

test("built portfolio tracks intent without breaking links or sending real analytics", {
  skip: !process.env.PLAYWRIGHT_MODULE,
}, async () => {
  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await context.route("**/*", route => route.request().url().startsWith(`${base}/`) ? route.continue() : route.abort());

  async function load(path) {
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => typeof window.gtag), "undefined");
    await page.evaluate(() => {
      window.analyticsCalls = [];
      window.linkResults = [];
      window.gtag = (...args) => window.analyticsCalls.push(args);
      window.suppressLinkNavigation = event => {
        const link = event.target.closest?.("a[href]");
        if (!link) return;
        window.linkResults.push({ prevented: event.defaultPrevented });
        event.preventDefault();
      };
      document.addEventListener("click", window.suppressLinkNavigation);
    });
  }

  async function click(selector, name, parameters) {
    await page.evaluate(() => { window.analyticsCalls = []; window.linkResults = []; });
    await page.locator(selector).first().click();
    assert.deepEqual(await page.evaluate(() => window.analyticsCalls), [["event", name, parameters]]);
    const results = await page.evaluate(() => window.linkResults);
    assert.ok(results.every(result => !result.prevented));
  }

  try {
    await load("/");
    await click('#home a[href^="mailto:"]', "email_click", { page_path: "/", link_location: "home", contact_intent: "general" });
    await click('#about a[href^="mailto:"]', "email_click", { page_path: "/", link_location: "about", contact_intent: "general" });
    for (const region of ["home", "about"]) {
      await click(`#${region} a[data-analytics-event="resume_click"]`, "resume_click", { page_path: "/", link_location: region, file_name: "KentaYoungResume2026.pdf" });
      assert.equal(await page.locator(`#${region} a[data-analytics-event="resume_click"]`).getAttribute("target"), "_blank");
    }
    const pdf = await context.request.get(`${base}/KentaYoungResume2026.pdf`);
    assert.equal(pdf.status(), 200);
    assert.ok((await pdf.body()).subarray(0, 5).equals(Buffer.from("%PDF-")));
    await click('#work a[href="/work/needed-academy"]', "case_study_click", { page_path: "/", link_location: "work", project_slug: "needed-academy" });
    await click('#contact a[href*="linkedin.com"] span', "social_click", { page_path: "/", link_location: "contact", platform: "linkedin", link_domain: "www.linkedin.com" });
    await click('footer a[href*="github.com"] svg path', "social_click", { page_path: "/", link_location: "footer", platform: "github", link_domain: "github.com" });

    await page.evaluate(() => document.removeEventListener("click", window.suppressLinkNavigation));
    await page.locator('#work a[href="/work/needed-academy"]').click();
    await page.waitForURL(`${base}/work/needed-academy`);

    await load("/work");
    await click('a[href="/work/needed-academy"]', "case_study_click", { page_path: "/work", link_location: "work_index", project_slug: "needed-academy" });

    await load("/photography");
    await click('a[data-contact-intent="photography"]', "email_click", { page_path: "/photography", link_location: "photo_contact", contact_intent: "photography" });
    for (const gallery of ["automotive", "travel"]) {
      const button = page.locator(`button[data-gallery="${gallery}"]`).first();
      const photoId = await button.getAttribute("data-photo-id");
      assert.ok(photoId);
      assert.equal(photoId, new URL(await button.locator("img").getAttribute("src")).pathname.split("/").pop());
      await click(`button[data-gallery="${gallery}"]`, "photo_open", { page_path: "/photography", gallery, photo_id: photoId });
      assert.equal(await page.locator("#lightbox").evaluate(el => el.open), true);
      await page.locator("#lightbox-next").click();
      await page.keyboard.press("ArrowLeft");
      assert.equal(await page.evaluate(() => window.analyticsCalls.length), 1);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#lightbox").evaluate(el => el.open), false);
    }

    await page.evaluate(() => { delete window.gtag; });
    await page.locator('button[data-gallery="travel"]').first().click();
    assert.equal(await page.locator("#lightbox").evaluate(el => el.open), true);
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 390, height: 844 });
    await load("/");
    await page.locator('button[aria-controls="site-menu"]').click();
    await click('#navbar a[href*="linkedin.com"] svg path', "social_click", { page_path: "/", link_location: "navbar", platform: "linkedin", link_domain: "www.linkedin.com" });
    assert.equal(await page.locator('button[aria-controls="site-menu"]').getAttribute("aria-expanded"), "false");
    assert.deepEqual(errors, []);

    const production = await browser.newContext();
    try {
      await production.route("**/*", async route => {
        const url = new URL(route.request().url());
        if (url.origin !== "https://kentayoung.dev") return route.abort();
        const response = await route.fetch({ url: `${base}${url.pathname}${url.search}` });
        return route.fulfill({ response });
      });
      const productionPage = await production.newPage();
      await productionPage.goto("https://kentayoung.dev/", { waitUntil: "networkidle" });
      const queue = await productionPage.evaluate(() => window.dataLayer.map(args => Array.from(args)));
      assert.equal(queue.filter(args => args[0] === "config" && args[1] === "G-FPRPFKVS3C").length, 1);
      await productionPage.evaluate(() => {
        document.addEventListener("click", event => event.preventDefault());
      });
      await productionPage.locator('#home a[href^="mailto:"]').click();
      const events = await productionPage.evaluate(() => window.dataLayer.map(args => Array.from(args)).filter(args => args[0] === "event"));
      assert.deepEqual(events, [["event", "email_click", { page_path: "/", link_location: "home", contact_intent: "general" }]]);
    } finally {
      await production.close();
    }
  } finally {
    await browser.close();
  }
});

test("built portfolio tracks middle-click once and keeps native new-tab behavior", {
  skip: !process.env.PLAYWRIGHT_MODULE,
}, async () => {
  const { chromium } = await import(process.env.PLAYWRIGHT_MODULE);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const calls = [];
  const external = [];
  const local = [];
  const errors = [];
  const opened = [];
  await context.route("**/*", route => {
    const url = route.request().url();
    if (url.startsWith(`${base}/`)) {
      local.push(url);
      return route.continue();
    }
    external.push(url);
    return route.fulfill({ status: 200, contentType: "text/html", body: "<title>stub</title>" });
  });
  await context.exposeBinding("recordAnalytics", ({ page }, args) => {
    if (page === mainPage) calls.push(args);
  });
  await context.addInitScript(() => {
    window.gtag = (...args) => window.recordAnalytics(args);
  });
  context.on("page", page => opened.push(page));
  const mainPage = await context.newPage();
  mainPage.on("pageerror", error => errors.push(error.message));

  async function activate(selector, options, expectedCalls, expectedTabs) {
    calls.length = 0;
    for (const page of opened.splice(0)) if (page !== mainPage) await page.close();
    const startUrl = mainPage.url();
    await mainPage.locator(selector).first().click(options);
    if (expectedTabs) await context.waitForEvent("page", { timeout: 5000 }).catch(() => {});
    await mainPage.waitForTimeout(750);
    const tabs = opened.filter(page => page !== mainPage);
    assert.deepEqual(calls, expectedCalls, `${selector} ${JSON.stringify(options)} analytics`);
    assert.equal(tabs.length, expectedTabs, `${selector} ${JSON.stringify(options)} new tabs`);
    return { startUrl, tabs };
  }

  try {
    await mainPage.goto(`${base}/`, { waitUntil: "networkidle" });
    const caseStudy = '#work a[href="/work/needed-academy"]';
    const caseEvent = [["event", "case_study_click", { page_path: "/", link_location: "work", project_slug: "needed-academy" }]];

    for (const options of [{ button: "middle" }, { modifiers: ["Control"] }]) {
      const { startUrl, tabs } = await activate(caseStudy, options, caseEvent, 1);
      await tabs[0].waitForLoadState();
      assert.equal(tabs[0].url(), `${base}/work/needed-academy`);
      assert.equal(mainPage.url(), startUrl);
    }

    await activate(caseStudy, { button: "right" }, [], 0);
    await mainPage.keyboard.press("Escape");

    const resume = '#home a[data-analytics-event="resume_click"]';
    const { tabs: resumeTabs } = await activate(resume, { button: "middle" },
      [["event", "resume_click", { page_path: "/", link_location: "home", file_name: "KentaYoungResume2026.pdf" }]], 1);
    assert.ok(resumeTabs[0] !== mainPage);
    assert.ok(local.includes(`${base}/KentaYoungResume2026.pdf`));

    const { tabs: socialTabs } = await activate('#contact a[href*="linkedin.com"]', { button: "middle" },
      [["event", "social_click", { page_path: "/", link_location: "contact", platform: "linkedin", link_domain: "www.linkedin.com" }]], 1);
    await socialTabs[0].waitForLoadState();
    assert.equal(socialTabs[0].url(), "https://www.linkedin.com/in/kentayoung");
    assert.deepEqual(external.filter(url => !url.startsWith("https://res.cloudinary.com/")), ["https://www.linkedin.com/in/kentayoung"]);

    calls.length = 0;
    await mainPage.evaluate(() => {
      document.dispatchEvent(new MouseEvent("auxclick", { bubbles: true, button: 1 }));
      const text = document.body.appendChild(document.createTextNode(""));
      text.dispatchEvent(new MouseEvent("auxclick", { bubbles: true, button: 1 }));
      text.remove();
    });
    await mainPage.waitForTimeout(100);
    assert.deepEqual(calls, []);

    await activate(caseStudy, {}, caseEvent, 0);
    await mainPage.waitForURL(`${base}/work/needed-academy`);
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
