import ProgressBar from './progressBar';

const SkillsSection = () => {
	return (
    <section id="skills" className="w-[calc(100vw-110px)] max-w-245 mx-auto pb-17.5 max-[900px]:w-[calc(100vw-40px)]">
      <h2 className="text-[calc(1.325rem+0.9vw)] text-text-light font-light pb-2.5 tracking-[0.25rem]">
        Skills
      </h2>
      <ProgressBar percent="95" title="Front End Development" />
      <ProgressBar percent="95" title="Shopify" />
      <ProgressBar percent="70" title="Back End Development" />
      <ProgressBar percent="90" title="Debugging" />
    </section>
  );
};

export default SkillsSection;
