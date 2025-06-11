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
