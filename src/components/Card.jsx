import React from "react";

const Card = ({ movie }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-4 bg-white">
      <img className="w-full" src={movie.Poster} alt={movie.Title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.Title}</div>
        <p className="text-gray-700 text-base">{movie.Year}</p>
      </div>
    </div>
  );
};

export default Card;
