const Masthead = () => {
  return (
    <section
      id="home"
      className="masthead relative w-screen min-h-screen flex flex-col justify-center text-center py-60"
    >
      <h1
        className="font-light text-[12vw] leading-[12vw] md:text-[6.5rem] md:leading-[7rem] opacity-0"
        style={{
          background: 'linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.25) 95%)',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animation: '1s cubic-bezier(0.22, 1, 0.36, 1) forwards 0.5s slideDownIn',
        }}
      >
        KENTA YOUNG
      </h1>
      <h2
        className="text-[3.5vw] md:text-[1.25rem] font-light text-white/50 opacity-0"
        style={{ animation: '1s linear forwards 1s fadeIn' }}
      >
        Software Engineer and Photographer
      </h2>
    </section>
  );
};

export default Masthead;
