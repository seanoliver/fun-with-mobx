enum TrackingEvents {
	VIEW_PAGE = 'ViewPage',
	CONVERT = 'Convert',
}

interface TrackingEvent {
	event: keyof typeof TrackingEvents;
	properties?: Record<string, any>;
	timestamp: string;
}

const useTrack = (): ((
	eventName: keyof typeof TrackingEvents,
	properties?: Record<string, any>
) => void) => {
	const track = async (
		eventName: keyof typeof TrackingEvents,
		properties?: Record<string, any>
	) => {
		fetch('/api/track', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event: eventName,
				properties,
				timestamp: new Date().toISOString(),
			}),
		}).catch(error => {
			console.warn(`Logging error: ${error}`);
		});
	};

	return track;
};
