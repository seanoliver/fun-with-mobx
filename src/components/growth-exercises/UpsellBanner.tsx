import React, { useEffect } from 'react';
import { Button } from '../ui/button';

interface User {
	plan: 'free' | 'pro';
	nodeCount: number;
	hasDismissedUpsell: boolean;
}

// Dummy user eligible for upsell banner
const user: User = {
	plan: 'free',
	nodeCount: 58,
	hasDismissedUpsell: false,
};

const onUpgradeClick = () => {
	// Trigger stripe checkout
	logEvent('upgrade_clicked');
};

const logEvent = (event: string) => {
	// TODO: Send event to Sentry or other analytics tool
	console.log('LOG: ', event);
};

interface UpsellBannerProps {
	onUpgradeClick: () => void;
	handleDismissUpsell: () => void;
	handleRenderUpsell: () => void;
	hasRenderedUpsell: boolean;
}

export const ParentView = () => {
	const {
		isEligible,
		handleDismissUpsell,
		handleRenderUpsell,
		hasRenderedUpsell,
	} = useShowUpsellBanner(user);

	return (
		<div>
			{isEligible && (
				<UpsellBanner
					onUpgradeClick={onUpgradeClick}
					handleDismissUpsell={handleDismissUpsell}
					handleRenderUpsell={handleRenderUpsell}
					hasRenderedUpsell={hasRenderedUpsell}
				/>
			)}
			<div>Other stuff</div>
		</div>
	);
};

const useShowUpsellBanner = (user: User) => {
	const hasRenderedUpsell = localStorage.getItem('hasRenderedUpsell') === 'true';
	const hasDismissedUpsell =
		user.hasDismissedUpsell || localStorage.getItem('hasDismissedUpsell') === 'true';
	const isEligible =
		user.plan === 'free' && user.nodeCount > 50 && !hasDismissedUpsell;

	const handleDismissUpsell = () => {
		user.hasDismissedUpsell = true;
		localStorage.setItem('hasDismissedUpsell', 'true');
		logEvent('upsell_banner_dismissed');
	};

	const handleRenderUpsell = () => {
		localStorage.setItem('hasRenderedUpsell', 'true');
		logEvent('upsell_banner_rendered');
	};

	return {
		isEligible,
		handleDismissUpsell,
		handleRenderUpsell,
		hasRenderedUpsell,
	};
};

export const UpsellBanner = ({
	onUpgradeClick,
	handleDismissUpsell,
	handleRenderUpsell,
	hasRenderedUpsell,
}: UpsellBannerProps) => {
	const onDismissClick = () => {
		handleDismissUpsell();
	};

	useEffect(() => {
		if (hasRenderedUpsell) return;
		handleRenderUpsell();
	}, [hasRenderedUpsell]);

	return (
		<div className='fixed top-0 bg-gray-300 border-gray-400 rounded-md p-2 flex justify-between items-center'>
			You're creating a lot of nodes! Upgrade to Pro to unlock more.
			<Button onClick={onUpgradeClick}>Upgrade</Button>
			<Button onClick={onDismissClick}>Dismiss</Button>
		</div>
	);
};
