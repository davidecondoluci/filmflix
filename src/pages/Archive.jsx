import { useState, useEffect } from "react";

import Search from "../components/Search";
import Card from "../components/Card";
import Detail from "../components/Detail";
import Logo from "../components/Logo";
import useScrollBlock from "../hooks/useScrollBlock";

const Archive = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim() !== "") {
        const url = `${
          import.meta.env.VITE_MOVIE_API_URL
        }?query=${searchTerm}&api_key=${import.meta.env.VITE_MOVIE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setMovies(data.results || []);
          setError("");
        } else {
          setError(data.status_message);
          setMovies([]);
        }
      } else {
        setMovies([]);
        setError("");
      }
    };

    searchMovies();
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    if (selectedMovie) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [selectedMovie, blockScroll, allowScroll]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-24">
      <header className="flex flex-col lg:w-1/2 text-center justify-center items-center p-8 space-y-4">
        <h1>
          <Logo />
        </h1>
        <h2 className="text-2xl font-sans font-bold mt-4">
          Welcome to FilmFlix, a Movie Storage App
        </h2>
        <p>
          This application allows you to search for your favorite movies. We use
          the TMDb API to fetch the data. Simply type the name of the movie in
          the search bar below and get all the information you need.
        </p>
      </header>
      <Search handleSearchInput={handleSearchInput} searchTerm={searchTerm} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {movies.map((movie, index) => (
          <Card
            key={index}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
        {selectedMovie && (
          <Detail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Archive;
