import { useState, useEffect } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Detail from "../components/Detail";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "b840e1a61a744a8817986c3df5b9c489";

const Archive = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    const storedSearchTerm = localStorage.getItem("searchTerm");
    const storedSelectedMovie = JSON.parse(
      localStorage.getItem("selectedMovie")
    );

    if (storedMovies) {
      setMovies(storedMovies);
    }

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }

    if (storedSelectedMovie) {
      setSelectedMovie(storedSelectedMovie);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
  }, [movies, searchTerm, selectedMovie]);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim() !== "") {
        const url = `${API_URL}?query=${searchTerm}&api_key=${API_KEY}`;
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

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <header className="w-1/2 text-center pt-8">
        <h1 className="text-2xl font-sans font-bold mt-4">
          Welcome to FilmFlix, a Movie Storage App
        </h1>
        <p>
          This application allows you to search for your favorite movies. We use
          the TMDb API to fetch the data. Simply type the name of the movie in
          the search bar below and get all the information you need.
        </p>
      </header>
      <div className="sticky top-0 w-full flex flex-col items-center bg-white">
        <Search handleSearchInput={handleSearchInput} searchTerm={searchTerm} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {movies.map((movie, index) => (
          <Card
            key={index}
            movie={movie}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </main>
      {selectedMovie && (
        <Detail movie={selectedMovie} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Archive;
