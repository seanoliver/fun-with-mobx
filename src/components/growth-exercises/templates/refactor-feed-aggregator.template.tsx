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

import React, { useState, useEffect } from "react";

type FeedItemType = {
  id: string;
  source: string;
  content: string;
  timestamp: number;
};

const FeedItem = ({ item }: { item: FeedItemType }) => (
  <div className="border p-2 mb-2">
    <strong>{item.source}</strong>: {item.content}
    <div className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</div>
  </div>
);

export default function FeedAggregator() {
  // your implementation here
}
