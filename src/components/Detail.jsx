import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Detail = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&append_to_response=videos,credits,reviews`;
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
      if (data.reviews && data.reviews.results) {
        setReviews(data.reviews.results);
      }
    };

    fetchDetails();
  }, [movie.id]);

  console.log(reviews);

  return (
    <div className="flex fixed inset-0 z-20 bg-black bg-opacity-50 items-center justify-center">
      <div className="flex flex-col lg:flex-row h-full lg:h-fit justify-start lg:items-start items-center bg-white p-8 rounded shadow-lg relative lg:w-3/4 space-x-4">
        <button className="absolute top-2 right-2 text-3xl" onClick={onClose}>
          <IoCloseCircleOutline />
        </button>
        {details && (
          <>
            <div className="flex w-full lg:w-1/3 container">
              {details.poster_path ? (
                <img
                  className="w-full h-auto"
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title}
                />
              ) : (
                <div
                  className="w-full bg-gray text-center flex items-center justify-center"
                  style={{ aspectRatio: "2 / 3" }}
                >
                  Poster not found
                </div>
              )}
            </div>
            <div className="w-2/3 space-y-4">
              <h2 className="text-2xl font-bold">{details.title}</h2>
              <p>Release Date: {details.release_date}</p>
              <p>Runtime: {details.runtime} minutes</p>
              <p>Rating: {details.vote_average} / 10</p>
              <p>
                Genres: {details.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>Overview: {details.overview}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;

Detail.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
