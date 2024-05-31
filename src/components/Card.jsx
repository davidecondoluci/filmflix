import React from "react";

const Card = ({ movie }) => {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const poster = posterPath ? (
    <img
      className="w-full"
      src={posterPath}
      alt={movie.title}
      style={{ aspectRatio: "2 / 3" }}
    />
  ) : (
    <div
      className="w-full bg-gray-200 text-center flex items-center justify-center"
      style={{ aspectRatio: "2 / 3" }}
    >
      Poster not found
    </div>
  );

  return (
    <div className="rounded overflow-hidden shadow-lg p-4 bg-white">
      {poster}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
      </div>
    </div>
  );
};

export default Card;
