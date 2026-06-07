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
        <div className="pb-1.25">
          Hey, friends! <span>&#128075;</span>
        </div>
        <p className="py-1.25 leading-5">
          My name is Kenta Young, a Software Engineer based in Idaho 🥔. I&#39;m
          hard working and creative with more than 10 years of expertise. With a
          strong understanding of Javascript, Shopify Liquid, HTML, and CSS
          coupled with a visually driven mind, I have a passion for developing
          stable and beautiful user interfaces.
        </p>
        <p className="py-1.25 leading-5">
          I&#39;m currently a full time Software Developer with{" "}
          <a href="https://thebeyondgroup.com/" className="link-hover-blue">
            The Beyond Group
          </a>{" "}
          and have had the opportunity to work with clients such as{" "}
          <a href="https://thisisneeded.com" className="link-hover-blue">
            Needed.
          </a>
          ,{" "}
          <a href="https://fromourplace.com" className="link-hover-blue">
            Our Place
          </a>
          ,{" "}
          <a href="https://houseofspoils.com" className="link-hover-blue">
            House of Spoils
          </a>
          , and{" "}
          <a href="https://hukitchen.com" className="link-hover-blue">
            HU Kitchen
          </a>
          .
        </p>
        <p className="py-1.25 leading-5">
          I&#39;m always open to new opportunities to create, so please feel
          free to reach out and check out my{" "}
          <a
            href={resume}
            className="link-hover-blue"
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
