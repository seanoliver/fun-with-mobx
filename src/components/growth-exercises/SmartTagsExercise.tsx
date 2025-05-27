import { useState } from 'react';

const logEvent = (event: string) => {
	// IRL this would be a call to Sentry or other analytics tool
	console.log('LOG: ', event);
};

interface TanaNode {
	id: string;
	text: string;
	smartTags: string[];
}

const nodes: TanaNode[] = [
	{
		id: '1',
		text: 'Node 1',
		smartTags: ['tag1', 'tag2'],
	},
	{
		id: '2',
		text: 'Node 2',
		smartTags: ['tag3', 'tag4'],
	},
];

const useViewedTooltip = (tooltipId: string) => {
	const [isHovered, setIsHovered] = useState(false);

	const hasViewedTooltip =
		localStorage.getItem(`tooltip_${tooltipId}`) === 'true';

	const handleViewTooltip = () => {
		localStorage.setItem(`tooltip_${tooltipId}`, 'true');
		logEvent(`${tooltipId}_tooltip_viewed`);
	};

	const handleMouseEnter = () => {
		if (hasViewedTooltip) return;
		setIsHovered(true);
		handleViewTooltip();
	};

	const handleMouseLeave = () => {
		if (!isHovered) return;
		setIsHovered(false);
	};

	return { handleMouseEnter, handleMouseLeave, isHovered };
};

const NodeListing = ({ node }: { node: TanaNode }) => {
	const { handleMouseEnter, handleMouseLeave, isHovered } =
		useViewedTooltip('smart_tags');

	return (
		<div>
			<div>
				<div>{node.text}</div>
				<div className={`${isHovered ? 'block' : 'hidden'}`}>
					Tooltip text
				</div>
				<div
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					{node.smartTags.join(', ')}
				</div>
			</div>
		</div>
	);
};
