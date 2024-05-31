import React, { useEffect, useState } from "react";

const API_KEY = "b840e1a61a744a8817986c3df5b9c489";

const Detail = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos,credits,reviews`;
      const response = await fetch(url);
      const data = await response.json();
      setDetails(data);
      if (data.reviews && data.reviews.results) {
        setReviews(data.reviews.results);
      }
    };

    fetchDetails();
  }, [movie.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg relative w-3/4 max-w-3xl flex">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {details && (
          <>
            <div className="w-1/3">
              {details.poster_path ? (
                <img
                  className="w-full"
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details.title}
                />
              ) : (
                <div
                  className="w-full bg-gray-200 text-center flex items-center justify-center"
                  style={{ aspectRatio: "2 / 3" }}
                >
                  Poster not found
                </div>
              )}
            </div>
            <div className="w-2/3 pl-4">
              <h2 className="text-2xl font-bold mb-4">{details.title}</h2>
              <p className="mb-4">Release Date: {details.release_date}</p>
              <p className="mb-4">Runtime: {details.runtime} minutes</p>
              <p className="mb-4">Rating: {details.vote_average} / 10</p>
              <p className="mb-4">
                Genres: {details.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="mb-4">Overview: {details.overview}</p>
              {reviews.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-2">Reviews:</h3>
                  {reviews.map((review) => (
                    <div key={review.id} className="mb-2">
                      <p className="font-semibold">{review.author}</p>
                      <p>{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
