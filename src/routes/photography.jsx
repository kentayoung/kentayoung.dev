import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/imageGallery/image-gallery';
import Footer from '../components/footer';

const Photography = () => {
	window.scrollTo(0, 0);

	return (
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Helmet>
				<title>Kenta Young - Photography</title>
				<meta name="description" content="Photographer based in Idaho." />
			</Helmet>
			<div className="min-h-[calc(100vh-150px)] mt-12.5">
				<section className="w-[calc(100vw-110px)] max-w-480 mx-auto max-[900px]:w-[calc(100vw-40px)]">
					<h2 className="text-[calc(1.325rem+0.9vw)] text-text-light font-light pb-2.5 tracking-[0.25rem]">
						Photography
					</h2>
					<ImageGallery />
				</section>
			</div>
			<Footer />
		</motion.div>
	);
};

export default Photography;
