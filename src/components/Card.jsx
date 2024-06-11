import PropTypes from "prop-types";
import { IoHeartCircle } from "react-icons/io5";

const Card = ({ movie, onClick }) => {
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
    <div
      className="rounded overflow-hidden shadow-md p-4 bg-white cursor-pointer"
      onClick={onClick}
    >
      <div>
        {poster}
        <IoHeartCircle />
      </div>
      <div className="font-bold text-xl py-4">{movie.title}</div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
