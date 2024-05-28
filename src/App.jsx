import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Card from "./components/Card"; // Assicurati che questo percorso sia corretto

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
    <div className="flex flex-col">
      <header className="sticky top-0 bg-white">
        <h1 className="text-2xl font-bold">Titolo</h1>
        <Search handleSearchInput={handleSearchInput} />
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </main>
    </div>
  );
};

export default App;
