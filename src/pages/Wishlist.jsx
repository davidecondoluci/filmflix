import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Card from "../components/Card";
import Detail from "../components/Detail";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviesDetails, setMoviesDetails] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await supabase.from("wishlist").select();
        setWishlist(data);

        const promises = data.map(async (item) => {
          const url = `${import.meta.env.VITE_MOVIE_API_URL}/movie/${
            item.movie_id
          }?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`;
          const response = await fetch(url);
          const movieDetails = await response.json();
          return movieDetails;
        });

        const moviesWithDetails = await Promise.all(promises);
        setMoviesDetails(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    fetchWishlist();
  }, []);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-2xl font-bold px-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {wishlist ? (
          moviesDetails.map((movie) => (
            <Card key={movie.id} movie={movie} onClick={handleCardClick} />
          ))
        ) : (
          <p>Loading wishlist...</p>
        )}
      </div>
      {selectedMovie && (
        <Detail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default Wishlist;
