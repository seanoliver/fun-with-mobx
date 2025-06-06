// 📦 Problem: Mismatched Wishlist
// You are building a component that displays a user's wishlist of products.
// The backend provides the wishlist as an array of product IDs.
// Your component must fetch the full product data for each ID using a given API endpoint,
// then render the titles of all valid products.
// Products may not exist for all IDs, so filter out any that result in 404s or invalid data.

// Requirements:
// - Fetch the wishlist from `/api/wishlist` (returns: string[] of product IDs)
// - For each product ID, fetch data from `/api/products/:id`
// - Display only the product titles in a list
// - Use array and object methods where appropriate
// - Show nothing while loading, no error UI is needed

import React, { useEffect, useState } from 'react'

export default function Wishlist() {
  // Your implementation here
}
