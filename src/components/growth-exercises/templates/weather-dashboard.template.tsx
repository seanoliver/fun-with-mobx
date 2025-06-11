// Problem: Create a `WeatherDashboard` component that fetches and displays current weather data
// for a list of cities. When the component mounts, it should trigger parallel API requests to
// retrieve weather data for each city, then render a list of temperature summaries.
//
// Requirements:
// - Use `useEffect` to manage side effects
// - Use the Fetch API to call a mock endpoint like `/api/weather?city=CityName`
// - Implement loading and error states
// - Use at least one array method to process or transform the data
// - Render the city name, temperature, and description for each city
//
// You may assume a response format like:
// { city: string, temperature: number, description: string }

import React, { useEffect, useState } from "react";

type WeatherData = {
  city: string;
  temperature: number;
  description: string;
};

const cities = ["New York", "London", "Tokyo", "Paris", "Sydney"];

export default function WeatherDashboard() {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Your implementation here
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 p-4">
      {data.map((weather) => (
        <div
          key={weather.city}
          className="rounded-2xl shadow p-4 bg-white space-y-2"
        >
          <h2 className="text-xl font-semibold">{weather.city}</h2>
          <p>{weather.temperature}°C - {weather.description}</p>
        </div>
      ))}
    </div>
  );
}
