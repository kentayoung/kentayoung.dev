import React from 'react';
import TrackVisibility from 'react-on-screen';

const ProgressBarComp = ({ isVisible, ...props }) => {
	let pbStyle = {};
	if (props.percent) {
		pbStyle.width = props.percent + '%';
	}

	return (
		<div className='pb-container'>
			<div className='pb-title'>{props.title}</div>
			<div className='pb-bar'>
				<div style={pbStyle} className={isVisible ? 'pb-bar-progress pb-animate' : ''}></div>
			</div>
		</div>
	);
};

const ProgressBar = (props) => {
	return (
		<TrackVisibility once>
			<ProgressBarComp {...props} />
		</TrackVisibility>
	);
};

export default ProgressBar;
