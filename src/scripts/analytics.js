export function trackEvent(name, parameters) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, { page_path: window.location.pathname, ...parameters });
}

export function trackLinkClick(event) {
  const link = event.target?.closest?.("a[href]");
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  const region = link.closest("[data-analytics-location], section[id], nav, footer");
  const parameters = {
    link_location: region?.dataset.analyticsLocation || region?.id || region?.tagName.toLowerCase() || "content",
  };

  if (url.protocol === "mailto:") {
    trackEvent("email_click", {
      ...parameters,
      contact_intent: link.dataset.contactIntent || "general",
    });
  } else if (url.origin === window.location.origin && link.dataset.analyticsEvent === "resume_click") {
    trackEvent("resume_click", { ...parameters, file_name: url.pathname.split("/").pop() });
  } else if (url.origin === window.location.origin && /^\/work\/[^/]+\/?$/.test(url.pathname)) {
    trackEvent("case_study_click", { ...parameters, project_slug: url.pathname.split("/")[2] });
  } else if (["https:", "http:"].includes(url.protocol) && url.origin !== window.location.origin) {
    const platform = new Map([
      ["linkedin.com", "linkedin"],
      ["github.com", "github"],
      ["instagram.com", "instagram"],
      ["facebook.com", "facebook"],
    ]).get(url.hostname.replace(/^www\./, ""));
    if (platform) trackEvent("social_click", { ...parameters, platform, link_domain: url.hostname });
  }
}
