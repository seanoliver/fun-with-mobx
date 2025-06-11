// Problem: Build a simple React component that connects to a backend endpoint using Server-Sent Events (SSE)
// and displays a live feed of messages in real-time. The feed should support filtering messages by keyword
// and allow clearing the feed. Messages are JSON objects containing a `timestamp`, `user`, and `content`.

// Requirements:
// - Connect to `/api/stream` via SSE.
// - Render messages in reverse chronological order (newest first).
// - Add a search input to filter displayed messages by `content` (case-insensitive substring match).
// - Include a "Clear" button to empty the current feed display without disconnecting from SSE.
// - Use Fetch API at least once (e.g., to load initial state or for user info).
// - Use at least two array/object methods.

import React, { useEffect, useRef, useState } from 'react';

type Message = {
	timestamp: string;
	user: string;
	content: string;
};

type User = {
	id: string;
	name: string;
};

const LiveFeed: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [search, setSearch] = useState('');
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const eventSourceRef = useRef<EventSource | null>(null);

	useEffect(() => {
		// TODO: initialize SSE connection to /api/stream and handle incoming messages
		// Hint: use JSON.parse(event.data) and update messages state
    eventSourceRef.current = new EventSource('/api/stream');

    eventSourceRef.current.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      setMessages(prev => [data, ...prev]);
    }

    return () => {
      eventSourceRef.current?.close();
    }
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('/api/user');
				if (!response.ok) {
					throw new Error('Bad server response');
				}
				const newUser = await response.json();
				if (newUser) setCurrentUser(newUser);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
		};
		fetchUserData();
	}, []);

  const handleFilter = () => {
    return messages.filter((m) => m.content.toLowerCase().includes(search.toLowerCase()))
  }

  const clearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearch('')
  }

	return (
		<div>
      <form>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={clearSearch}>Clear</button>
      </form>

      {handleFilter().map((message, index) => {
        return (
          <div key={`${index}-message`}>
            <div>
              {message.user}
            </div>
            <div>
              {message.content}
            </div>
            <div>
              {message.timestamp}
            </div>
          </div>
        )
      })}
		</div>
	);
};

export default LiveFeed;
