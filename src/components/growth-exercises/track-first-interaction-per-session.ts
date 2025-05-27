type Interaction = {
	nodeId: string;
	timestamp: number;
};

const INTERACTION_KEY = 'node_interaction';

const onUserInteraction = (interaction: Interaction) => {
	const interactionKey = sessionStorage.getItem(
		`${INTERACTION_KEY}-${interaction.nodeId}`
	);

	if (!interactionKey) {
		logInteraction(interaction.nodeId);
		sessionStorage.setItem(`${INTERACTION_KEY}-${interaction.nodeId}`, 'true');
	}
};

const logInteraction = (nodeId: string) => {
	console.log(`Interaction logged for node: ${nodeId}`);
};
