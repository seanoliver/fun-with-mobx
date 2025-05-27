import React, { useState } from 'react';

interface TooltipProps {
	active: boolean;
	children: React.ReactNode;
}

export const Tooltip = ({ active = false, children }: TooltipProps) => {
	const [isHovered, setIsHovered] = useState(false);

	if (!active) return children;
	return (
		<div
			className='relative inline-block cursor-pointer'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{children}
			<div
				className={`${
					isHovered ? 'block' : 'hidden'
				} absolute top-[-50px] min-h-[30px] min-w-[200px] bg-black text-white opacity-50 p-2 rounded-md`}>
				This is a tooltip
			</div>
		</div>
	);
};
