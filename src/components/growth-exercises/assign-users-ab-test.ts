const VARIANTS = ['A', 'B'] as const;
type Variant = (typeof VARIANTS)[number];

const assignVariant = (userId: string, testId: string): Variant => {
	const hash = simpleHash(`${userId}-${testId}`);
	const mod = hash % VARIANTS.length;

	return VARIANTS[mod];
};

const assignVariantN = <T extends readonly string[]>(
	userId: string,
	testId: string,
	variants: T
): T[number] => {
  const hash = simpleHash(`${userId}-${testId}`);
	const mod = hash % variants.length;

	return variants[mod];
};

const simpleHash = (str: string): number => {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char; // bitwise left shift by 5 bits, then subtract the hash and add the char
		hash |= 0; // force a 32-bit integer
	}

	return Math.abs(hash);
};
