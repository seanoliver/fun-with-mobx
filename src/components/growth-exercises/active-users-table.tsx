// 🧠 Problem: Active Users Table
// Build a component that fetches and displays a table of users who have been active in the past 7 days.
// Call the backend API at `/api/users`, which returns an array of users with this shape:

import { useEffect, useState } from 'react';

//
type User = {
	id: string;
	name: string;
	lastActive: string; // ISO date string
};
//
// The component should:
// - Fetch the list of users on mount.
// - Filter for users whose `lastActive` date is within the last 7 days.
// - Sort these users by most recent activity first.
// - Display their name and the formatted last active date (e.g., "2 days ago").
//
// If loading or if the request fails, show appropriate messaging.

const MS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

const fetchUsersList = async () => {
	try {
		const response = await fetch('/api/users');
		if (!response.ok) throw new Error('Bad Response from users API');

		const data: User[] = await response.json();

		return data;
	} catch (e) {
		console.error(`HTTP Error: ${e}`);
	}
};

const sevenDaysAgo = Date.now() - 7 * MS_IN_ONE_DAY;

const useActiveUsers = () => {
	const [activeUsers, setActiveUsers] = useState<User[] | undefined>(undefined);

	const getLastWeekActiveUsers = async () => {
		try {
			const users = await fetchUsersList();
			if (!users || users.length === 0)
				throw new Error('Users list is missing/empty');

			const lastWeekActiveUsers = users.filter(user => {
				const lastActiveDate = Number(new Date(user.lastActive));
				return lastActiveDate >= sevenDaysAgo;
			});

			const sortedLastWeekActiveUsers = lastWeekActiveUsers.sort(
				(a, b) => Number(b.lastActive) - Number(a.lastActive)
			);

			if (sortedLastWeekActiveUsers.length > 0) {
				setActiveUsers(sortedLastWeekActiveUsers);
			}
		} catch (e) {
			console.error(`Error calling backend API route: ${e}`);
		}
	};

	useEffect(() => {
		const fetchActiveUsers = async () => {
			await getLastWeekActiveUsers();
		};
		fetchActiveUsers();
	}, []);
	return { getLastWeekActiveUsers, activeUsers };
};

const getRelativeDate = ({ dateInput }: { dateInput: number }) => {
	const now = Date.now();
	const diff = now - dateInput;

	const days = Math.round(diff / MS_IN_ONE_DAY);

	if (days === 0) {
		return 'in the last day';
	} else if (days === 1) {
		return 'yesterday';
	} else {
		return `${days} days ago`;
	}
};

export const ActiveUsersTable = () => {
	const { activeUsers } = useActiveUsers();

	return (
		<div>
			{activeUsers &&
				activeUsers.length > 0 &&
				activeUsers?.map((user, index) => {
					return (
						<div
							key={`user-${index}`}
							className='flex flex-row gap-2 justify-center items-center'>
							<span>{user.name}</span>
							<span>
								{getRelativeDate({ dateInput: Number(user.lastActive) })}
							</span>
						</div>
					);
				})}
		</div>
	);
};
