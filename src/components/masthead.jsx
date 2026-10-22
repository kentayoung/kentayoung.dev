import resume from "../assets/KentaYoungResume2026.pdf";

const Masthead = () => {
  return (
    <section
      id="home"
      className="masthead relative w-screen min-h-screen flex flex-col justify-center text-center py-60"
    >
      <h1
        className="font-light text-[12vw] leading-[12vw] md:text-[6.5rem] md:leading-[7rem] opacity-0"
        style={{
          background:
            "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.7) 95%)",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.6))",
          animation:
            "1s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.5s slideDownIn",
        }}
      >
        KENTA YOUNG
      </h1>
      <h2
        className="text-[3.5vw] md:text-[1.25rem] font-light text-white/80 opacity-0"
        style={{ animation: "1s linear forwards 1s fadeIn" }}
      >
        Software Engineer and Photographer
      </h2>
      <p
        className="max-w-xl mx-auto mt-6 px-5 text-base md:text-lg text-text-light opacity-0"
        style={{ animation: "1s linear forwards 1.3s fadeIn" }}
      >
        Software engineer with 10+ years building web applications and
        ecommerce platforms.
      </p>
      <div
        className="flex flex-wrap justify-center gap-4 mt-8 px-5 opacity-0"
        style={{ animation: "1s linear forwards 1.6s fadeIn" }}
      >
        <a
          href="mailto:kenta@kentayoung.dev"
          className="bg-seafoam text-dark px-6 py-3 rounded-full text-sm tracking-widest uppercase hover:brightness-110 transition"
        >
          Get in touch
        </a>
        <a
          href={resume}
          target="_blank"
          rel="noreferrer"
          className="border border-seafoam text-text-light px-6 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-seafoam/20 transition"
        >
          Resume
        </a>
      </div>
    </section>
  );
};

export default Masthead;
