import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

const stack = ["Shopify", "Liquid", "JavaScript", "Recharge", "Metafields"];

const built = [
  "Consolidated separate subscription listings into single variant-based Shopify products, with a variant for each delivery schedule.",
  "Set up Recharge selling plans with different billing intervals on those variants.",
  "Built custom product page interactions and purchase selectors for choosing a variant and a subscription plan.",
  "Updated collection quick-add so it handles the new product structure.",
  "Reworked cart interstitials, subscription handling, and upsell flows to match.",
];

const challenges = [
  {
    title: "Migrating without breaking existing products",
    body: "Products that had already been migrated needed to keep behaving sensibly, so the cart messaging and product card logic included fallback behavior for them.",
  },
  {
    title: "Accessible selection",
    body: "Choosing a variant and a selling plan are two linked decisions. I built the selectors so they work with a keyboard and screen readers, not just a mouse.",
  },
  {
    title: "Shared state across product and cart",
    body: "The product page, quick-add, and cart all react to the same purchase choices, so I managed JavaScript events and UI state carefully to keep them in sync.",
  },
];

const Needed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Needed Case Study | Kenta Young</title>
        <meta
          name="description"
          content="Case study: rebuilding subscription purchasing for Needed on Shopify and Recharge, with variant-based products, custom selectors, and cart upsells."
        />
        <link rel="canonical" href="https://kentayoung.dev/work/needed" />
        <meta property="og:url" content="https://kentayoung.dev/work/needed" />
        <meta property="og:title" content="Needed Case Study | Kenta Young" />
        <meta
          property="og:description"
          content="Rebuilding subscription purchasing for Needed on Shopify and Recharge."
        />
      </Helmet>
      <div className="min-h-[calc(100vh-150px)] mt-12.5">
        <article className="w-[calc(100vw-110px)] max-w-245 mx-auto py-17.5 max-[900px]:w-[calc(100vw-40px)] text-text-light">
          <Link to="/#work" className="link-hover-seafoam text-sm">
            &larr; Selected work
          </Link>
          <h1 className="text-[calc(1.325rem+0.9vw)] font-light pt-6 pb-2.5 tracking-[0.25rem]">
            Needed
          </h1>
          <p className="text-lg text-text-light/80 pb-6">
            Custom subscription purchasing on Shopify and Recharge.
          </p>
          <ul className="flex flex-wrap gap-2 pb-10">
            {stack.map((item) => (
              <li
                key={item}
                className="border border-[#3a3f2e] bg-[#262b20] text-sm px-3 py-1 rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-[0.8rem] uppercase tracking-[0.15rem] text-text-light/60 pb-2">
            Overview
          </h2>
          <p className="leading-6 pb-10">
            <a
              href="https://thisisneeded.com"
              className="link-hover-seafoam"
              target="_blank"
              rel="noreferrer"
            >
              Needed
            </a>{" "}
            sells subscription products, and each delivery schedule used to be
            its own product listing. I worked on moving those into variant-based
            Shopify products backed by Recharge selling plans, then updated
            everything that touches a purchase: the product page, collection
            quick-add, the cart, upsells, and interstitials. I did this as a
            Senior Software Developer at{" "}
            <a
              href="https://thebeyondgroup.com/"
              className="link-hover-seafoam"
              target="_blank"
              rel="noreferrer"
            >
              The Beyond Group
            </a>
            .
          </p>

          <h2 className="text-[0.8rem] uppercase tracking-[0.15rem] text-text-light/60 pb-2">
            What I built
          </h2>
          <ul className="list-disc pl-5 leading-6 pb-10 space-y-2 marker:text-seafoam">
            {built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="text-[0.8rem] uppercase tracking-[0.15rem] text-text-light/60 pb-4">
            Technical challenges
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {challenges.map(({ title, body }) => (
              <div key={title} className="bg-[#262b20] rounded-[10px] p-6">
                <h3 className="text-base pb-2">{title}</h3>
                <p className="text-sm leading-5 text-text-light/80">{body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Needed;
