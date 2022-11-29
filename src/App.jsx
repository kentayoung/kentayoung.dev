import './App.css';
import './css/compiled.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from './config/firebaseConfig';
import { getAnalytics } from 'firebase/analytics';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/navbar/navbar';
import AnimatedRoutes from './routes/animatedRoutes';

function App() {
	const updateViewportHeight = () => {
		document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
	};
	window.addEventListener('resize', updateViewportHeight);
	updateViewportHeight();

	if (process.env.NODE_ENV !== 'development') {
		//setting up analytics for prod
		getAnalytics(firebase);

		const consoleStyleMain = 'font-size: 16px;';
		const consoleStyleChild = 'font-size: 14px;';
		console.group(`%c👋 Hey there, nice seeing you here. Don't forget to check out my other links.`, consoleStyleMain);
		console.log(`%c👨‍💻 Github - https://github.com/kentayoung`, consoleStyleChild);
		console.log(`%c📄 LinkedIn - https://www.linkedin.com/in/kentayoung`, consoleStyleChild);
		console.log(`%c📧 Email - Kenta@KentaYoung.dev`, consoleStyleChild);
		console.groupEnd();
	} else {
		console.log('localhost: turning off analytics and custom console');
	}

	return (
		<div className='app'>
			<HelmetProvider>
				<Router>
					<Navbar Router={Router} />
					<AnimatedRoutes />
				</Router>
			</HelmetProvider>
		</div>
	);
}

export default App;
