type TanaNode = {
	id: string;
	title: string;
	children: TanaNode[];
	starred?: boolean;
};

const tree: TanaNode = {
	id: 'root',
	title: 'Root',
	children: [
		{
			id: '1',
			title: 'First Child',
			children: [],
		},
		{
			id: '2',
			title: 'Second Child',
			children: [
				{
					id: '2-1',
					title: 'Nested Child',
					children: [],
				},
			],
		},
	],
};

const findNodeById = (tree: TanaNode, id: string): TanaNode | null => {
	if (tree.id === id) return toggleStarred(tree);

	for (const node of tree.children) {
		const result = findNodeById(node, id);
		if (result) return result;
	}

	return null;
};

const toggleStarred = (node: TanaNode): TanaNode => {
	node.starred = node.starred ? false : true;
	return node;
};

const findNodeByIdImmutable = (tree: TanaNode, id: string): TanaNode => {
	if (tree.id === id) {
		return { ...tree, starred: !tree.starred };
	}

	return {
		...tree,
		children: tree.children.map(child => findNodeByIdImmutable(child, id)),
	};
};

const debounce = (fn: (...args: any[]) => void, delay: number) => {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, delay);
	};
};

const optimisticToggleStarred = async (tree: TanaNode, id: string) => {
	const prev = tree.starred ?? false;
	tree.starred = !prev;
	try {
		await syncStarredState(tree.id, tree.starred);
	} catch {
		tree.starred = prev;
	}
};

const debouncedOptimisticToggleStarred = debounce(optimisticToggleStarred, 300);

const syncStarredState = async (
	id: string,
	newValue: boolean
): Promise<void> => {
	// TODO: Need to implement the real thing
	await fetch('/api/update-node', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id,
			newValue,
		}),
	});
};
