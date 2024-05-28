import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Card from "./components/Card";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=652f2e5d";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim() !== "") {
        const response = await fetch(`${API_URL}&s=${searchTerm}`);
        const data = await response.json();
        setMovies(data.Search || []);
        searchRef.current.scrollIntoView({ behavior: "smooth" });
        document.body.classList.remove("overflow-hidden");
      } else {
        setMovies([]);
        document.body.classList.add("overflow-hidden");
      }
    };

    searchMovies();
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <header className="w-1/2 text-center p-4">
        <h1 className="text-2xl font-bold">Welcome to Movie Search App</h1>
        <p>
          This application allows you to search any type of movies. I use the
          OMDB API to fetch the data and React to create the app. Simply type
          the name of the movie in the search bar below and get all the
          information you need.
        </p>
      </header>
      <div
        ref={searchRef}
        className="sticky top-0 bg-white w-full flex justify-center mb-4"
      >
        <Search handleSearchInput={handleSearchInput} />
      </div>
      <main
        className={`grid ${
          movies.length === 0
            ? "hidden"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4"
        }`}
      >
        {movies.map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </main>
    </div>
  );
};

export default App;
