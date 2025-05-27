import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

interface TanaNode {
	id: string;
	text: string;
	smartTags: string[];
	createdAt: Date;
}

const GLOBAL_EVENTS = {
	NudgeCardShown: 'nudge_card_shown',
	NudgeCardDismissed: 'nudge_card_dismissed',
	NudgeCardCTAClicked: 'nudge_card_cta_clicked',
} as const;

type AnalyticsEvent = keyof typeof GLOBAL_EVENTS;

const logEvent = (event: AnalyticsEvent) => {
	console.log('EVENT LOGGED: ', GLOBAL_EVENTS[event]);
};

class NodesStore {
	nodes: TanaNode[] = [];

	constructor() {
		makeObservable(this, {
			nodes: observable,
			addNode: action,
		});
	}

	addNode(text: string) {
		this.nodes.push({
			id: crypto.randomUUID(),
			text,
			smartTags: [],
			createdAt: new Date(),
		});
	}
}

export const DashboardView = observer(() => {
	const nodesStore = new NodesStore();

	return (
		<div>
			<div>
				<div>Menu</div>
				{['Dashboard', 'Nodes', 'Tags', 'Settings'].map(item => (
					<div key={item}>{item}</div>
				))}
			</div>
			<div>
				<div>Nodes Listing</div>
				{nodesStore.nodes.map(node => (
					<div key={node.id}>{node.text}</div>
				))}
			</div>
		</div>
	);
});

export const InactiveNudge = observer(() => {
	return (
		<div>
			<div>Stuck? Try adding a quick note to keep momentum going.</div>
			<div>
				<button>Add node</button>
				<button>Dismiss</button>
			</div>
		</div>
	);
});
