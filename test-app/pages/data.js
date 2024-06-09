"use client";  // Ensure this marks the file as a Client Component

import { useState, useEffect } from 'react';

export default function DataPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:5000/data');
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 500); // Fetch every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from Python Script</h1>
      <p>Timestamp: {new Date(data.timestamp * 1000).toLocaleString()}</p>
      <p>Value: {data.value}</p>
    </div>
  );
}
