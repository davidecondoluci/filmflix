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
  const [showTempLogo, setShowTempLogo] = useState(false);
  const [isLogoClicked, setIsLogoClicked] = useState(false); // Aggiunto stato per il click sul logo principale

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
    setIsLogoClicked(true);
    setShowTempLogo(true);
    setTimeout(() => {
      setShowTempLogo(false);
      setSearchTerm("");
      setMovies([]);
      setError("");
      setSelectedMovie(null);
      setIsLogoClicked(false); // Ripristina lo stato del click sul logo
    }, 1000); // Il logo temporaneo sarà visibile per 1 secondo
  };

  const logoToShow =
    (!isLogoClicked && !showTempLogo) || isMouseOverLogo ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="71"
        fill="none"
        viewBox="0 0 350 71"
        className="mx-auto w-1/2 cursor-pointer"
      >
        <g clip-path="url(#a)">
          <path fill="#7C4DFF" d="M53 32.4H6.4v38.2h18.2v-23H53V32.3Z" />
          <path
            fill="#607D8B"
            d="M70 3c-2.6 0-4.8 1-6.5 2.7a9.1 9.1 0 0 0-2.6 6.6c0 2.6.9 4.8 2.6 6.6a8.7 8.7 0 0 0 6.5 2.7c2.6 0 4.8-.9 6.5-2.7 1.7-1.8 2.6-4 2.6-6.6 0-2.6-.9-4.8-2.6-6.6A8.6 8.6 0 0 0 70 3ZM79 25.8H61v44.8h18V25.8ZM105.2 4H87.4v66.6h17.8V3.9ZM177.9 27.1c-2.8-1.5-6-2.2-9.5-2.2-3.9 0-7.3.8-10.2 2.4-1.4.7-2.5 1.6-3.6 2.5a15.8 15.8 0 0 0-11.7-5 20.1 20.1 0 0 0-11.3 3.4v-2.4h-17.8v44.8h17.8V44.9c0-1 .2-2 .6-2.6a4 4 0 0 1 1.7-1.7c.8-.4 1.6-.6 2.6-.6 1.4 0 2.6.4 3.5 1.3.9.9 1.3 2 1.3 3.6v25.7h17.9V44.9c0-1 .2-2 .6-2.6a4 4 0 0 1 1.7-1.7c.8-.4 1.6-.6 2.6-.6 1.4 0 2.5.4 3.4 1.3 1 .9 1.4 2 1.4 3.6v25.7h17.8V44c0-4-.7-7.4-2.3-10.3-1.6-2.9-3.8-5-6.5-6.6ZM210.1 5.8h-14.7v64.8h18.2v-23H242V32.3h-28.4V21h29.7V5.8h-33.2ZM268 4h-17.8v66.6H268V3.9ZM294.3 25.8h-17.8v44.8h17.8V25.8ZM285.4 3c-2.6 0-4.8 1-6.5 2.7a9.1 9.1 0 0 0-2.6 6.6c0 2.6.9 4.8 2.6 6.6a8.7 8.7 0 0 0 6.5 2.7c2.6 0 4.8-.9 6.5-2.7 1.7-1.8 2.6-4 2.6-6.6 0-2.6-.9-4.8-2.6-6.6a8.6 8.6 0 0 0-6.5-2.7ZM350 70.6l-15.4-23.2 14.5-21.6h-18.8l-5.5 9.7-5.3-9.7h-20.4l14.8 22-15.7 22.8H317l6.7-11.2 6 11.2H350Z"
          />
          <path fill="#7C4DFF" d="M45 0 0 21l6.4 13.7 45-21L45.1 0Z" />
        </g>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="163"
        fill="none"
        viewBox="0 0 350 163"
        className="mx-auto w-1/2 cursor-pointer"
      >
        <g clip-path="url(#a)">
          <path fill="#B4131D" d="M0 162.3h350V0H0v162.3Z" />
          <path
            fill="#fff"
            d="m150.3 87.8-5.6-46.7H134l-.1 64.7 6.2-.3.4-53.4 6 53.2 7.6-.2 6.5-53 .5 52.9h6.4V41h-11.4l-5.8 46.8ZM228.6 101l-.1-60h-6.7l.1 65 15.6.9v-5.4l-9-.5ZM194 70.7V46.3h8.7v-5.2H187v63.8l7 .1V76l8.6.1v-5.2l-8.7-.1ZM42 114.2l6.9-1V80.5l8.7-.6V74l-8.7.6V47l8.7-.1v-5.8H42.1v73ZM76.6 110l6.5-.7V41.2h-6.4l-.1 68.8ZM109.5 41.1h-6.7l-.1 66.5a949 949 0 0 1 15.5-1v-5.4l-8.9.6.2-60.7ZM253 41.1v67l6.6.5-.2-67.5H253ZM295.2 41.2l-4.5 25.3h-.6l-4.5-25.3h-6.7l5.9 31.6-6 37.7 6.7.7 4.7-31.4h.4l4.4 32.6 6.7.8-6-39.9 6.1-32h-6.6Z"
          />
          <path
            fill="#211C1D"
            d="M40.6 39.8v76.1l7.2 5.6c3-.5 6.1-1 9.2-1.3V87.8l8.7-.7v-8l-6.6-6.6-2 .1V55l8.7-.2v-8l-6.7-7H40.6Zm17 7.2-8.7.1v27.5l8.7-.6v5.8l-8.7.6v32.9l-6.8 1v-73h15.5V47ZM75.2 39.8l-.1 71.8 7.2 5.4 8.9-.9.1-69.6-6.6-6.7h-9.5Zm7.9 69.5-6.5.7.1-68.8h6.5l-.1 68.1ZM117.5 100l.1-53.7-6.6-6.5h-9.7l-.1 69.3 7.2 5.5 18-1.2v-7.5l-6.7-6h-2.2Zm.7 6.6-15.5 1 .1-66.5h6.7l-.2 60.7 9-.6-.1 5.4ZM169 39.8h-14.3l-1 7.3-7.7-7.3h-13.5l-.1 67.4 7.2 5.5c2.9 0 5.8-.2 8.6-.3V108l4.8 4.4 9.2-.2.6-4.6 4.8 4.5h8V46l-6.6-6.3Zm-1.5 65.1h-6.4l-.5-52.9-6.5 53.1-7.6.2-6-53.2-.5 53.4-6.1.3V41h10.8l5.6 46.7 5.8-46.7h11.4v63.8ZM210.9 76a1425 1425 0 0 0-6.7-6.5h-2v-16h8.6v-7.3l-6.6-6.4h-18.6v66.4l7.4 6 9.2.2V83.2l8.7.1V76Zm-16.9-.1V105l-6.8-.2V41.1h15.5v5.2H194v24.4h8.7V76L194 76ZM239 100.3l-2.3-.2V46.3a1447 1447 0 0 0-6.8-6.5h-9.6l.1 67.5 7.3 6.3c6 .3 12 .8 18 1.3v-7.6l-6.8-7Zm-17.1 5.7-.1-65h6.7v60l9 .5v5.4l-15.6-.9ZM261 39.8h-9.5l.1 69.5 7.3 6.7 8.8 1-.1-70.5-6.7-6.7Zm-8 68.2V41.1h6.4l.2 67.5a925 925 0 0 0-6.5-.6ZM303.7 39.8H294l-1.1 6.2-5.9-6.2h-9.8l6.2 33-6.1 39 7.2 7.1 9.1 1.2 1-6.1 6.4 7.2 9.1 1.4-6.2-42 6.5-33.6-6.6-7.2Zm-2 73.4-6.7-.8-4.4-32.6h-.4l-4.7 31.4-6.6-.7 5.9-37.7-5.9-31.6h6.7l4.5 25.3h.6l4.5-25.3h6.6l-6.1 32.1 6 40Z"
          />
        </g>
      </svg>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <header className="w-1/2 text-center pt-8">
        <div
          className="flex justify-center items-center mx-auto h-[163px]"
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
