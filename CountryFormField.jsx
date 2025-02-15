import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState(""); // User input 
  const [suggestions, setSuggestions] = useState([]); // Suggestion List

  useEffect(() => {
    if (!query) 
    {
      setSuggestions([]); // No suggestion if no input
      return;
    }

    const fetchCountries = setTimeout(() => {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          const countryNames = response.data.map((country) => country.name.common);
          setSuggestions(countryNames);
        })
        .catch(() => setSuggestions([]));
    }, 1000); // 1 second delay (debouncing)

    return () => clearTimeout(fetchCountries); // destroy previous object

  }, [query]); 

  return (
    <div>
      <h2>Country Search</h2>
      <input
        type="text"
        placeholder="Type a country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  );
}
