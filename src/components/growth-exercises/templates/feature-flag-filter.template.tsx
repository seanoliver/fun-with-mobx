// 🧪 Problem: Feature Flag Filter
// Your team uses feature flags to control access to new components.
// Build a component that fetches a list of active feature flag keys for a user,
// then displays a list of all features that are marked as active.
// The list of *all* possible features is stored in a static object locally.
// Only display features that match active flags returned from the API.

// Requirements:
// - Fetch active feature flags from `/api/flags` (returns: string[] of active keys)
// - Use a local constant object of all features (id: { name, description })
// - Display name + description for each active feature
// - Use at least one array method and one object method
// - Show nothing while loading

import React, { useEffect, useState } from 'react';

const ALL_FEATURES = {
  darkMode: { name: 'Dark Mode', description: 'Switch to a dark theme.' },
  betaDashboard: { name: 'Beta Dashboard', description: 'Try the new dashboard UI.' },
  aiSummarizer: { name: 'AI Summarizer', description: 'Automatically summarize pages.' },
  instantSearch: { name: 'Instant Search', description: 'Search results as you type.' },
};

export default function FeatureList() {
  // your implementation
}
