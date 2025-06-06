/**
 * React Frontend Developer Interview Test (15-30 minutes)
 *
 * Build a GitHub User Search application with the following features:
 *
 * 1. Search for GitHub users by username
 * 2. Display user profile (avatar, name, bio, repo count)
 * 3. Show user's 5 most recent repositories
 *
 * APIs:
 * - User data: https://api.github.com/users/{username}
 * - User repos: https://api.github.com/users/{username}/repos?sort=updated&per_page=5
 *
 * Requirements:
 * - Handle loading states and errors appropriately
 * - Use async/await with proper error handling
 * - Separate components with clear responsibilities
 */

import React, { ChangeEvent, useEffect, useState } from 'react';

interface GitHubUser {
	login: string;
	name: string | null;
	avatar_url: string;
	bio: string | null;
	public_repos: number;
}

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	language: string | null;
}

interface DummyRequest {
	body: string;
}

interface DummyResponse {
	user: GitHubUser;
	repos: GitHubRepo[];
}

const apiRoute = async ({ request }: { request: DummyRequest }) => {
	try {
		const searchTerm = request.body;

		const userResponse = await fetch(
			`https://api.github.com/users/${searchTerm}`
		);
    if (!userResponse.ok) throw new Error("User not found");
    const userResponseJson = await userResponse.json();

    const repoResponse = await fetch(
			`https://api.github.com/users/${searchTerm}/repos?sort=updated&per_page=5`
		);
    if (!repoResponse.ok) throw new Error("Repos not found")
		const repoResponseJson = await repoResponse.json();

		const response = {
			user: userResponseJson,
			repos: repoResponseJson,
		};

		return { body: response };
	} catch (e) {
		throw new Error(`Error thrown: ${e}`);
	}
};

type CurrentUser = DummyResponse;

const useGitHubAPI = () => {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchGitHubUser = async (
		username: string
	): Promise<CurrentUser | undefined> => {
		try {
			setIsLoading(true);
			const response = await apiRoute({ request: { body: username } });
			if (!response) {
				return undefined;
			}
			setCurrentUser({ ...response.body });
			setIsLoading(false);
			console.log('setCurrentUser', { ...response.body });
			return { ...response.body };
		} catch (e) {
			setIsLoading(false);
			throw new Error(`Error: ${e}`);
		}
	};

	return {
		fetchGitHubUser,
		currentUser,
		setCurrentUser,
		isLoading,
		setIsLoading,
	};
};

const UserSearch: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const { fetchGitHubUser, currentUser, setCurrentUser, isLoading } =
		useGitHubAPI();

	useEffect(() => {
		console.log('currentUser', currentUser);
	}, [currentUser]);

	return (
		<div>
			<input
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				placeholder='Enter GitHub username...'
			/>
			<button onClick={() => fetchGitHubUser('seanoliver')}>Search</button>
		</div>
	);
};

const UserProfile: React.FC = () => {
	return (
		<div>
			<h3>User Profile</h3>
		</div>
	);
};

const UserSearchHome: React.FC = () => {
	return (
		<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
			<h1>GitHub User Search</h1>
			<UserSearch />
			<UserProfile />
		</div>
	);
};

export default UserSearchHome;
