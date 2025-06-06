// 📦 Problem: Mismatched Wishlist
// You are building a component that displays a user's wishlist of products.
// The backend provides the wishlist as an array of product IDs.
// Your component must fetch the full product data for each ID using a given API endpoint,
// then render the titles of all valid products.
// Products may not exist for all IDs, so filter out any that result in 404s or invalid data.

// Requirements:
// X Fetch the wishlist from `/api/wishlist` (returns: string[] of product IDs)
// X For each product ID, fetch data from `/api/products/:id`
// X Display only the product titles in a list
// X Use array and object methods where appropriate
// X Show nothing while loading, no error UI is needed

import { useEffect, useState } from 'react';

type ProductData = {
	id: string;
	title: string;
};

const isFulfilled = (
	pr: PromiseSettledResult<ProductData>
): pr is PromiseFulfilledResult<ProductData> => pr.status === 'fulfilled';

const useWishlist = () => {
	const [products, setProducts] = useState<ProductData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchProductData = async (productId: string) => {
		try {
			const response = await fetch(`/api/products/${productId}`);
			if (!response.ok) {
				throw new Error(`ERROR: Failed to fetch product: ${productId}`);
			}
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(`Whoops! ${e}`);
		}
	};

	useEffect(() => {
		if (products.length > 0) return;

		const fetchWishlist = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/wishlist');
				if (!response.ok) {
					setLoading(false);
					throw new Error('No wishlist!');
				}
				const data: string[] = await response.json();
				let pdPromises: Promise<ProductData>[] = [];
				data.map(fetchProductData);

				const promiseResults = await Promise.allSettled(pdPromises);
				const productPromises = promiseResults
					.filter(isFulfilled)
					.map(pr => pr.value);

				setProducts(productPromises);
				setLoading(false);
			} catch (e) {
				console.error(`Fetch error: ${e}`);
				setLoading(false);
			}
		};

		fetchWishlist();
	}, [products.length]);

	return { products, loading };
};

export default function Wishlist() {
	const { products, loading } = useWishlist();

	if (loading || !products) return null;

	return (
		<ul>
			{products.map((p, i) => {
				return <li key={`${p.id}-${i}`}>{p.title}</li>;
			})}
		</ul>
	);
}
