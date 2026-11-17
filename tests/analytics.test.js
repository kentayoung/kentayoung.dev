import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { trackEvent, trackLinkClick } from "../src/scripts/analytics.js";

let calls;

beforeEach(() => {
  calls = [];
  globalThis.window = {
    location: new URL("https://kentayoung.dev/"),
    gtag: (...args) => calls.push(args),
  };
});

function clickLink(href, { region = "home", dataset = {}, tagName = "SECTION" } = {}) {
  const link = {
    href: new URL(href, window.location.href).href,
    dataset,
    closest: () => ({ id: region, tagName, dataset: {} }),
  };
  const event = {
    target: { closest: (selector) => selector === "a[href]" ? link : null },
    defaultPrevented: false,
    preventDefault() { this.defaultPrevented = true; },
  };
  trackLinkClick(event);
  return event;
}

test("email clicks include placement and intent without blocking the link", () => {
  const event = clickLink("mailto:kenta@kentayoung.dev?subject=Private%20subject");
  assert.deepEqual(calls, [["event", "email_click", {
    page_path: "/",
    link_location: "home",
    contact_intent: "general",
  }]]);
  assert.equal(event.defaultPrevented, false);
});

test("case-study clicks include a stable slug and do not count the work index", () => {
  const event = clickLink("/work/needed-academy/?source=private#details", { region: "work" });
  clickLink("/work");
  clickLink("https://example.com/work/needed-academy");
  assert.deepEqual(calls, [["event", "case_study_click", {
    page_path: "/", link_location: "work", project_slug: "needed-academy",
  }]]);
  assert.equal(event.defaultPrevented, false);
});

test("social clicks identify the platform without sending URLs or queries", () => {
  clickLink("https://www.linkedin.com/in/kentayoung?private=value", { region: "contact" });
  clickLink("https://example.com");
  clickLink("https://linkedin.com.example.com");
  assert.deepEqual(calls, [["event", "social_click", {
    page_path: "/", link_location: "contact", platform: "linkedin", link_domain: "www.linkedin.com",
  }]]);
});

test("photography inquiries have distinct intent", () => {
  window.location = new URL("https://kentayoung.dev/photography");
  clickLink("mailto:kenta@kentayoung.dev?subject=Photography%20inquiry", {
    region: "photo_contact", dataset: { contactIntent: "photography" },
  });
  assert.deepEqual(calls, [["event", "email_click", {
    page_path: "/photography", link_location: "photo_contact", contact_intent: "photography",
  }]]);
});

test("all supported social platforms are classified with or without www", () => {
  for (const platform of ["github", "instagram", "facebook", "linkedin"]) {
    for (const prefix of ["", "www."]) {
      clickLink(`https://${prefix}${platform}.com/profile`, { region: "", tagName: "FOOTER" });
      assert.equal(calls.at(-1)[1], "social_click");
      assert.equal(calls.at(-1)[2].platform, platform);
      assert.equal(calls.at(-1)[2].link_location, "footer");
    }
  }
  assert.equal(calls.length, 8);
});

test("analytics stays inert when gtag is absent or not callable", () => {
  for (const gtag of [undefined, null, {}]) {
    window.gtag = gtag;
    const event = clickLink("mailto:kenta@kentayoung.dev");
    trackEvent("photo_open", { gallery: "travel", photo_id: "sample-photo" });
    assert.equal(event.defaultPrevented, false);
  }
  assert.deepEqual(calls, []);
});

test("non-link targets and untracked protocols do not emit custom events", () => {
  for (const target of [null, {}, { closest: () => null }]) trackLinkClick({ target });
  for (const href of ["tel:+15551234567", "javascript:void(0)", "#about", "/photography", "ftp://github.com/file"]) clickLink(href);
  assert.deepEqual(calls, []);
});

test("shared photo tracking includes the page but not query strings", () => {
  window.location = new URL("https://kentayoung.dev/photography?private=value#gallery");
  trackEvent("photo_open", { gallery: "travel", photo_id: "stable-photo-id" });
  assert.deepEqual(calls, [["event", "photo_open", {
    page_path: "/photography", gallery: "travel", photo_id: "stable-photo-id",
  }]]);
});

test("only explicitly marked same-site resume links emit resume_click", () => {
  clickLink("/KentaYoungResume2026.pdf", { region: "about", dataset: { analyticsEvent: "resume_click" } });
  clickLink("/another-document.pdf");
  clickLink("https://example.com/resume.pdf", { dataset: { analyticsEvent: "resume_click" } });
  assert.deepEqual(calls, [["event", "resume_click", {
    page_path: "/", link_location: "about", file_name: "KentaYoungResume2026.pdf",
  }]]);
});
