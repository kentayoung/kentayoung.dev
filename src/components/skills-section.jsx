const skills = [
  {
    title: "Shopify",
    items: [
      "Online Store 2.0",
      "Liquid",
      "Shopify Plus",
      "Metafields and metaobjects",
      "Shopify Flow",
      "Checkout and customer accounts",
    ],
  },
  {
    title: "Ecommerce",
    items: [
      "Recharge subscriptions",
      "Intelligems A/B testing",
      "Klaviyo",
      "Gorgias",
      "Catalog migrations",
    ],
  },
  {
    title: "Analytics and Integrations",
    items: ["Segment", "GA4", "Littledata", "HubSpot"],
  },
  {
    title: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "AngularJS",
      "HTML",
      "CSS/SCSS",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Technical leadership",
      "Architecture",
      "Code review",
      "Git and GitHub Actions",
      "CI/CD",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="w-[calc(100vw-110px)] max-w-245 mx-auto pb-17.5 max-[900px]:w-[calc(100vw-40px)]"
    >
      <h2 className="text-[calc(1.325rem+0.9vw)] text-text-light font-light pb-2.5 tracking-[0.25rem]">
        Skills
      </h2>
      {skills.map(({ title, items }) => (
        <div key={title} className="my-4">
          <h3 className="text-text-light/60 text-[0.8rem] uppercase tracking-[0.15rem] mb-2">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="border border-[#3a3f2e] bg-[#262b20] text-text-light text-sm px-3 py-1 rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default SkillsSection;
