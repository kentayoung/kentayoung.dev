import resume from "../assets/KentaYoungResume.pdf";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-[calc(100vw-110px)] max-w-245 mx-auto py-17.5 max-[900px]:w-[calc(100vw-40px)] flex flex-col"
    >
      <h2 className="text-[calc(1.325rem+0.9vw)] text-text-light font-light pb-2.5 tracking-[0.25rem]">
        About
      </h2>
      <div className="text-base text-text-light">
        <p className="py-1.25 leading-5">
          I&#39;m Kenta Young, a Software Engineer and photographer based in
          Idaho 🥔. With more than a decade of experience and a strong
          understanding of Javascript, Shopify Liquid, HTML, and CSS, I have a
          passion for building Shopify storefronts and polished web experiences.
        </p>
        <p className="py-1.25 leading-5">
          I spent nearly 4 years at{" "}
          <a href="https://thebeyondgroup.com/" className="link-hover-seafoam">
            The Beyond Group
          </a>
          , the last 1½ as a Senior Software Developer leading a small team,
          working with clients such as{" "}
          <a href="https://thisisneeded.com" className="link-hover-seafoam">
            Needed
          </a>
          ,{" "}
          <a href="https://fabfitfun.com" className="link-hover-seafoam">
            FabFitFun
          </a>
          ,{" "}
          <a href="https://fromourplace.com" className="link-hover-seafoam">
            Our Place
          </a>
          ,{" "}
          <a href="https://houseofspoils.com" className="link-hover-seafoam">
            House of Spoils
          </a>
          ,{" "}
          <a href="https://hukitchen.com" className="link-hover-seafoam">
            HU Kitchen
          </a>
          ,{" "}
          <a href="https://dagnedover.com" className="link-hover-seafoam">
            Dagne Dover
          </a>
          ,{" "}
          <a href="https://unhide.us" className="link-hover-seafoam">
            Unhide
          </a>
          , and{" "}
          <a href="https://tryauri.com" className="link-hover-seafoam">
            Auri Nutrition
          </a>
          .
        </p>
        <p className="py-1.25 leading-5">
          I&#39;m open to new opportunities to create, so please feel free to{" "}
          <a href="mailto:kenta@kentayoung.dev" className="link-hover-seafoam">
            reach out
          </a>{" "}
          and check out my{" "}
          <a
            href={resume}
            className="link-hover-seafoam"
            download="KentaYoungResume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            resume
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
