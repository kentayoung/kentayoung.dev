import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { MenuItems } from './menu-items';
import { FaInstagram, FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

const Navbar = () => {
	const [togglerClicked, setTogglerClicked] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScrolled(window.scrollY > 50);
		});
	}, []);

	const handleTogglerClicked = () => {
		setTogglerClicked(!togglerClicked);
		document.body.style.overflow = togglerClicked ? 'scroll' : 'hidden';
	};

	const setTogglerFalse = () => {
		setTogglerClicked(false);
		document.body.style.overflow = 'scroll';
	};

	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
		const yOffset = -80;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};

	return (
		<nav
			id="navbar"
			className={`fixed top-0 left-0 w-screen h-12.5 flex justify-around items-center text-xl text-text-light z-999 transition-colors duration-1000 ${
				togglerClicked || scrolled ? 'bg-[#333]' : ''
			}`}
		>
			{/* Hamburger toggler — mobile only */}
			<div
				onClick={handleTogglerClicked}
				className={`max-[900px]:block hidden absolute top-2.75 right-2.25 cursor-pointer nav-toggler ${
					togglerClicked ? 'active' : ''
				}`}
			>
				<div className="nav-toggler-line1 w-7.5 h-0.5 bg-text-light my-1.25"></div>
				<div className="nav-toggler-line2 w-7.5 h-0.5 bg-text-light my-1.25"></div>
				<div className="nav-toggler-line3 w-7.5 h-0.5 bg-text-light my-1.25"></div>
			</div>

			{/* Nav items */}
			<ul
				className={`flex items-center justify-end list-none text-base w-[85vw] max-w-480 mr-8
					max-[900px]:flex-col max-[900px]:justify-around max-[900px]:w-screen max-[900px]:absolute
					max-[900px]:right-0 max-[900px]:h-[calc(var(--viewport-height)-48px)] max-[900px]:top-12.5
					max-[900px]:mr-0 max-[900px]:bg-dark max-[900px]:z-1
					nav-items-mobile ${togglerClicked ? 'active' : ''}`}
			>
				{MenuItems.map((item, i) => (
					<li
						className="mx-5 no-underline max-[900px]:text-center max-[900px]:w-full max-[900px]:text-2xl max-[900px]:h-full max-[900px]:opacity-0"
						key={i}
						style={
							togglerClicked
								? { animation: `navLinkFadeIn .75s ease forwards ${i / MenuItems.length}s` }
								: { opacity: 1 }
						}
					>
						<HashLink
							scroll={(el) => scrollWithOffset(el)}
							to={item.href}
							className="link-hover text-text-light max-[900px]:flex max-[900px]:items-center max-[900px]:justify-center max-[900px]:h-full"
							onClick={setTogglerFalse}
						>
							{item.display}
						</HashLink>
					</li>
				))}

				{/* Social links — visible in mobile menu only */}
				<li
					className="flex flex-row justify-evenly items-center max-[900px]:opacity-0 min-[900px]:hidden w-full"
					style={
						togglerClicked
							? { animation: `navLinkFadeIn .75s ease forwards ${MenuItems.length / MenuItems.length}s` }
							: { opacity: 1 }
					}
				>
					<a id="linkedIn-KentaYoung" href="https://www.linkedin.com/in/kentayoung" target="_blank" rel="noreferrer" className="icon-circle"><FaLinkedin /></a>
					<a id="instagram-KentaYoung" href="https://www.instagram.com/kenta_young/" target="_blank" rel="noreferrer" className="icon-circle"><FaInstagram /></a>
					<a id="facebook-KentaYoung" href="https://www.facebook.com/kentayoungphotography" target="_blank" rel="noreferrer" className="icon-circle"><FaFacebook /></a>
					<a id="github-KentaYoung" href="https://github.com/kentayoung" target="_blank" rel="noreferrer" className="icon-circle"><FaGithub /></a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
