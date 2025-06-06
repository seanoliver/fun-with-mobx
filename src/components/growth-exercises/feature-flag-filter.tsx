// 🧪 Problem: Feature Flag Filter
// Your team uses feature flags to control access to new components.
// Build a component that fetches a list of active feature flag keys for a user,
// then displays a list of all features that are marked as active.
// The list of *all* possible features is stored in a static object locally.
// Only display features that match active flags returned from the API.

// Requirements:
// X Fetch active feature flags from `/api/flags` (returns: string[] of active keys)
// X Use a local constant object of all features (id: { name, description })
// X Display name + description for each active feature
// X Use at least one array method and one object method
// X Show nothing while loading

import React, { useEffect, useState } from 'react';

type FeatureItem = {
	name: string;
	description: string;
};

const ALL_FEATURES: Record<string, FeatureItem> = {
	darkMode: { name: 'Dark Mode', description: 'Switch to a dark theme.' },
	betaDashboard: {
		name: 'Beta Dashboard',
		description: 'Try the new dashboard UI.',
	},
	aiSummarizer: {
		name: 'AI Summarizer',
		description: 'Automatically summarize pages.',
	},
	instantSearch: {
		name: 'Instant Search',
		description: 'Search results as you type.',
	},
};

const extractFeature = (id: string) => {
	return ALL_FEATURES[id] || undefined;
};

const useActiveFlags = () => {
	const [activeFeatures, setActiveFeatures] = useState<FeatureItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchFeatureFlags = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/flags');
			if (!response.ok) {
				setIsLoading(false);
				throw new Error(`Fetch error: ${response}`);
			}

			const data = await response.json();
			const flags = data
				.map(extractFeature)
				.filter((f: FeatureItem): f is FeatureItem => f !== undefined);

			setActiveFeatures(flags);
			setIsLoading(false);
		} catch (e) {
			console.error(`Fetch error: ${e}`);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchFeatureFlags();
	}, []);

	return { isLoading, activeFeatures };
};

export default function FeatureList() {
	const { isLoading, activeFeatures } = useActiveFlags();

	if (isLoading) return null;

	return (
		<div>
			{activeFeatures.map((feature, index) => {
				return (
					<div key={`${feature.name}-${index}`}>
						<div>{feature.name}</div>
						<div>{feature.description}</div>
					</div>
				);
			})}
		</div>
	);
}
