// Problem: Refactor Feed Aggregator
// A user-facing dashboard fetches recent activity from multiple third-party services.
// Implement the `FeedAggregator` component which:
// - Fetches data from 3 separate endpoints in parallel (e.g., /api/github, /api/twitter, /api/figma)
// - Combines and normalizes the results into a single feed array, sorted by timestamp (most recent first)
// - Renders each item using a generic `FeedItem` component
// - Only re-fetches if the user clicks a "Refresh" button

// Notes:
// - Each API returns data in a slightly different shape
// - You must use `Promise.all` or an equivalent to parallelize fetches
// - Normalize data to `{ id: string, source: string, content: string, timestamp: number }`

import React, { useState, useEffect } from 'react';

type FeedItemType = {
	id: string;
	source: string;
	content: string;
	timestamp: number;
};

const useFetchFeedItems = () => {
	const [feed, setFeed] = useState<FeedItemType[]>([]);

	const fetchAndRefreshStream = async () => {
		const githubItemsPromise = fetch('/api/github');
		const twitterItemsPromise = fetch('/api/twitter');
		const figmaItemsPromise = fetch('/api/figma');

		const responses = await Promise.all([
			githubItemsPromise,
			twitterItemsPromise,
			figmaItemsPromise,
		]);

		const [githubData, twitterData, figmaData] = await Promise.all(
			responses.map(res => res.json())
		);

		const normalizedGithubData = githubData.map((d: FeedItemType) => {
			return {
				id: d.id,
				source: 'github',
				content: d.content,
				timestamp: d.timestamp,
			};
		});
		const normalizedTwitterData = twitterData.map((d: FeedItemType) => {
			return {
				id: d.id,
				source: 'twitter',
				content: d.content,
				timestamp: d.timestamp,
			};
		});

		const normalizedFigmaData = figmaData.map((d: FeedItemType) => {
			return {
				id: d.id,
				source: 'figma',
				content: d.content,
				timestamp: d.timestamp,
			};
		});

		const unsortedFeed = [
			...normalizedGithubData,
			...normalizedTwitterData,
			...normalizedFigmaData,
		];

		const sortedFeed = unsortedFeed.sort((a, b) => b.timestamp - a.timestamp);

		setFeed([...sortedFeed]);
	};

	useEffect(() => {
		if (!feed.length) {
			fetchAndRefreshStream();
		}
	});

	return { feed, fetchAndRefreshStream };
};

const FeedItem = ({ item }: { item: FeedItemType }) => (
	<div className='border p-2 mb-2'>
		<strong>{item.source}</strong>: {item.content}
		<div className='text-xs text-gray-500'>
			{new Date(item.timestamp).toLocaleString()}
		</div>
	</div>
);

export default function FeedAggregator() {
	const { feed, fetchAndRefreshStream } = useFetchFeedItems();

	return (
		<div>
			<div>
				<h1>Your feed</h1>
				<div>
					{feed.length
						? feed.map(item => {
								return (
									<FeedItem
										key={item.id}
										item={item}
									/>
								);
						  })
						: 'No feed items to display. Try refreshing.'}
				</div>
			</div>
			<div>
				<button onClick={fetchAndRefreshStream}>Refresh Feed</button>
			</div>
		</div>
	);
}
