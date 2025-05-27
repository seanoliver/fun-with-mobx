type LogEvent = {
	userId: string;
	variant: 'A' | 'B';
	event: 'view' | 'convert';
};

const getConversionRates = (events: LogEvent[]): { A: number; B: number } => {
	// calculate the conversion rate for each event
	// only count unique users per variant per event
	// cr = users who converted / users who viewed

	const rateA =
		countUnique(events, 'A', 'convert') / countUnique(events, 'A', 'view');
	const rateB =
		countUnique(events, 'B', 'convert') / countUnique(events, 'B', 'view');

	return { A: rateA, B: rateB };
};

const countUnique = (
	events: LogEvent[],
	variant: 'A' | 'B',
	eventType: 'view' | 'convert'
): number => {
	const eventSet = new Set();
	const filteredEvents = events.filter(
		e => e.event === eventType && e.variant === variant
	);

	filteredEvents.forEach(fe => {
		eventSet.add(fe.userId);
	});

	return eventSet.size;
};
