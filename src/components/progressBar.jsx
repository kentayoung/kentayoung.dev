import React from 'react';
import TrackVisibility from 'react-on-screen';

const ProgressBarComp = ({ isVisible, percent, title }) => {
	return (
		<div className="my-2.5">
			<div className="text-text-light mb-1.25">{title}</div>
			<div className="border border-[#3a3f2e] h-3 overflow-hidden">
				<div
					style={{ width: percent ? `${percent}%` : undefined }}
					className={isVisible ? 'pb-bar-progress pb-animate bg-seafoam h-full' : ''}
				/>
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
