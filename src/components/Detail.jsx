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
    <div className="fixed inset-0 z-20 flex items-center justify-center p-4 bg-black/50">
      <div className="relative flex flex-col w-full max-h-full pt-10 overflow-y-auto bg-white rounded shadow-lg lg:flex-row lg:w-3/4 lg:pt-0">
        <button
          className="absolute z-10 text-3xl cursor-pointer top-3 right-3"
          onClick={onClose}
        >
          <IoCloseCircleOutline />
        </button>
        {details && (
          <>
            <div className="flex-shrink-0 w-1/2 mx-auto lg:w-1/3 lg:mx-0 lg:p-4">
              {details.poster_path ? (
                <img
                  className="block w-full h-auto rounded lg:rounded-l lg:rounded-r-none"
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title}
                />
              ) : (
                <div
                  className="flex items-center justify-center w-full text-center bg-gray-200 rounded-t lg:rounded-l lg:rounded-t-none"
                  style={{ aspectRatio: "2 / 3" }}
                >
                  Poster not found
                </div>
              )}
            </div>
            <div className="w-full p-6 space-y-4 text-left lg:w-2/3">
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
