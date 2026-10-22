import { Link } from "react-router-dom";

const projects = [
  {
    slug: "needed",
    client: "Needed",
    title: "Custom subscription commerce",
    summary:
      "Rebuilt subscription purchasing on Shopify and Recharge, from variant-based products to custom selectors and cart upsells.",
    stack: ["Shopify", "Liquid", "JavaScript", "Recharge"],
  },
];

const WorkSection = () => {
  return (
    <section
      id="work"
      className="w-[calc(100vw-110px)] max-w-245 mx-auto pb-17.5 max-[900px]:w-[calc(100vw-40px)]"
    >
      <h2 className="text-[calc(1.325rem+0.9vw)] text-text-light font-light pb-2.5 tracking-[0.25rem]">
        Selected Work
      </h2>
      <div className="grid gap-6">
        {projects.map(({ slug, client, title, summary, stack }) => (
          <Link
            key={slug}
            to={`/work/${slug}`}
            className="block bg-[#262b20] rounded-[10px] p-8 border border-transparent hover:border-seafoam transition"
          >
            <div className="text-[0.8rem] uppercase tracking-[0.15rem] text-seafoam">
              {client}
            </div>
            <h3 className="text-xl text-text-light font-light pt-1 pb-2">
              {title}
            </h3>
            <p className="text-text-light/80 leading-5 pb-4">{summary}</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="border border-[#3a3f2e] text-text-light text-sm px-3 py-1 rounded-full"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 text-seafoam text-sm">Read the case study &rarr;</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
