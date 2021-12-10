import React from 'react';

import Masthead from '../components/masthead';
import AboutSection from '../components/about-section';
import SkillsSection from '../components/skills-section';
import ContactSection from '../components/contact-section';

const Home = ({ component: RouteComponent, ...rest }) => {
	return (
		<div>
			<Masthead />
			<AboutSection />
			<SkillsSection />
			<ContactSection />
		</div>
	);
};

export default Home;