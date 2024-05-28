import React, { useState, useEffect } from "react";
import Search from "./components/Search";

const API_URL = "http://www.omdbapi.com/?apikey=652f2e5d";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim() !== "") {
        const response = await fetch(`${API_URL}&s=${searchTerm}`);
        const data = await response.json();
        setMovies(data.Search || []);
      } else {
        setMovies([]);
      }
    };

    searchMovies();
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Movie Storage</h1>
      <Search searchInput={handleSearchInput} />
    </div>
  );
};

export default App;
