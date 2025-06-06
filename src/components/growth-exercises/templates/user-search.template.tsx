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

import React, { useState, useEffect } from 'react';

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

const UserSearch: React.FC = () => {
  return (
    <div>
      <input type="text" placeholder="Enter GitHub username..." />
      <button>Search</button>
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

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>GitHub User Search</h1>
      <UserSearch />
      <UserProfile />
    </div>
  );
};

export default App;