import React, { useState, useEffect, useRef } from "react";
import Search from "./components/Search";
import Card from "./components/Card";
import Detail from "./components/Detail";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "b840e1a61a744a8817986c3df5b9c489";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const resultsRef = useRef(null);
  const [isMouseOverLogo, setIsMouseOverLogo] = useState(false);

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
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
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

  const handleLogoMouseEnter = () => {
    setIsMouseOverLogo(true);
  };

  const handleLogoMouseLeave = () => {
    setIsMouseOverLogo(false);
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    setMovies([]);
    setError("");
    setSelectedMovie(null);
  };

  const logoToShow = isMouseOverLogo ? (
    <svg
      className="mx-auto w-1/2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 770 156"
    >
      <g clip-path="url(#a)">
        <path fill="#B4131D" d="M0 156h336.4V0H0v156Z" />
        <path
          fill="#fff"
          d="m144 84.4-5.3-45h-10.4v62.3l5.9-.3.4-51.3 5.8 51.1 7.3-.2 6.3-51 .4 50.9h6.2V39.4h-11l-5.5 45ZM219.3 97l-.1-57.5h-6.5l.1 62.4 15 .8v-5.1l-8.5-.5ZM186 68V44.4h8.4v-5h-15v61.4h6.7V73l8.3.1v-5h-8.3ZM40 109.8l6.6-1V77.4l8.3-.6v-5.5l-8.3.5V45.3l8.3-.1v-5.6H40v70.2ZM73.2 105.7l6.2-.6.1-65.5h-6.2l-.1 66.1ZM104.8 39.5h-6.4l-.2 64c5-.4 10-.8 15-1v-5.2l-8.5.5V39.5ZM242.7 39.5l.1 64.3 6.2.6V39.5h-6.3ZM283.3 39.6 279 64h-.6a8572 8572 0 0 0-4.3-24.3h-6.4l5.6 30.4-5.7 36.2 6.4.7 4.5-30.2h.4l4.2 31.3 6.4.8-5.7-38.3 5.9-30.9h-6.4Z"
        />
        <path
          fill="#211C1D"
          d="M38.6 38.2v73.2l7 5.4c2.9-.5 5.8-1 8.8-1.3V84.4l8.3-.7V76l-6.4-6.3h-1.9v-17l8.4-.1v-7.7l-6.4-6.7H38.6Zm16.3 7h-8.3v26.5l8.3-.5v5.5l-8.3.6V109l-6.6.9V39.6h15v5.6ZM71.9 38.2l-.1 69 7 5.3 8.4-.9.2-67c-2.2-2-4.3-4.2-6.4-6.4h-9.1Zm7.5 66.9-6.2.6.1-66.1h6.2l-.1 65.5ZM112.5 96l.1-51.5-6.4-6.3H97V105l6.9 5.2A844 844 0 0 1 121 109v-7.2c-2-2-4.2-3.9-6.4-5.9l-2 .1Zm.7 6.4-15 1 .2-63.9h6.4l-.1 58.3 8.5-.5v5.1ZM162 38.2h-13.8l-.8 7-7.5-7h-13l-.1 64.8 7 5.3 8.2-.3v-4.3l4.6 4.2 8.9-.2.6-4.4 4.6 4.4h7.7V44.2l-6.4-6Zm-1.4 62.6h-6.2L154 50l-6.3 51-7.3.2-5.8-51.1-.4 51.3-6 .3.1-62.2h10.4l5.4 45 5.5-45h11v61.3ZM202.3 73l-6.5-6.2H194V51.3h8.3v-7l-6.4-6.2H178v63.9l7 5.7 9 .2V80l8.3.1v-7ZM186 73v28l-6.6-.1V39.5h14.9v5H186v23.4l8.4.1v5h-8.3ZM229.2 96.4l-2-.2-.2-51.7-6.4-6.3h-9.3l.1 64.9 7 6 17.3 1.3V103l-6.5-6.7Zm-16.4 5.5V39.5h6.4V97l8.6.5v5.1l-15-.8ZM250.3 38.2h-9V105c2.4 2.2 4.8 4.3 7 6.5l8.6.9-.1-67.7-6.5-6.5Zm-7.5 65.6-.1-64.3h6.2l.1 64.8-6.2-.5ZM291.5 38.2H282l-1 6-5.7-6H266l6 31.8-6 37.4a666 666 0 0 1 7 6.9l8.8 1.1.9-5.9 6.2 7 8.7 1.3-5.9-40.3 6.2-32.3-6.3-7Zm-2 70.6-6.4-.8-4.2-31.3h-.4L274 107l-6.4-.7 5.7-36.2-5.6-30.4h6.4l4.3 24.3h.6l4.3-24.3h6.4l-6 30.9c2 12.6 4 25.4 5.8 38.3Z"
        />
      </g>
    </svg>
  ) : (
    <svg
      className="mx-auto w-1/2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 770 156"
    >
      <g clip-path="url(#a)">
        <path fill="#7C4DFF" d="M116.4 71.3H14V155h40v-50.6h62.4V71.3Z" />
        <path
          fill="#607D8B"
          d="M153.8 6.7a19 19 0 0 0-14.3 5.9 20 20 0 0 0-5.7 14.5 20 20 0 0 0 5.7 14.5 19 19 0 0 0 14.3 5.9c5.8 0 10.7-2 14.4-6 3.8-3.9 5.6-8.7 5.6-14.4 0-5.8-1.8-10.6-5.6-14.5a19 19 0 0 0-14.4-6ZM173.4 56.7h-39.2V155h39.2V56.7ZM231.2 8.7H192V155h39.2V8.7ZM391 59.7c-6.1-3.4-13.1-5-21-5-8.4 0-15.8 1.7-22.4 5.3-2.9 1.5-5.5 3.4-7.8 5.6a34.8 34.8 0 0 0-25.8-11 44.3 44.3 0 0 0-24.8 7.3v-5.2H250V155h39.2V98.7c0-2.3.5-4.2 1.3-5.8a8.9 8.9 0 0 1 3.8-3.7c1.7-1 3.6-1.3 5.7-1.3 3.1 0 5.6 1 7.6 2.9s3 4.5 3 7.9V155h39.2V98.7c0-2.3.5-4.2 1.3-5.8a8.9 8.9 0 0 1 3.8-3.7c1.7-1 3.6-1.3 5.7-1.3 3.1 0 5.6 1 7.6 2.9s3 4.5 3 7.9V155h39.2V96.7a46 46 0 0 0-5.2-22.6C401.8 67.8 397 63 391 59.7ZM461.8 12.7h-32.4V155h40v-50.6h62.4V71.3h-62.4V45.9h65.4V12.7h-73ZM589 8.7h-39.2V155H589V8.7ZM646.8 56.7h-39.2V155h39.2V56.7ZM627.2 6.7a19 19 0 0 0-14.3 5.9 20 20 0 0 0-5.7 14.5 20 20 0 0 0 5.7 14.5 19 19 0 0 0 14.3 5.9c5.8 0 10.7-2 14.4-6 3.8-3.9 5.6-8.7 5.6-14.4 0-5.8-1.8-10.6-5.6-14.5a19 19 0 0 0-14.4-6ZM769.2 155l-33.7-50.9 31.7-47.4H726L714 78l-11.7-21.3h-44.8l32.4 48.4-34.4 50h41.2l14.8-24.6 13.4 24.6h44.4Z"
        />
        <path fill="#7C4DFF" d="M99 0 0 46.2l14 30 99-46.1L99 0Z" />
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <header className="w-1/2 text-center pt-8">
        <div
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
          onClick={handleLogoClick}
        >
          {logoToShow}
        </div>
        <h1 className="text-2xl font-bold mt-4">
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
      <main
        ref={resultsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8"
      >
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

export default App;
