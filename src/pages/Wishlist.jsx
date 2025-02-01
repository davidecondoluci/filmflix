import { useState, useEffect } from "react";
import { db } from "../utils/firebaseClient"; // Usa Firestore
import { collection, getDocs } from "firebase/firestore";
import Card from "../components/Card";
import Detail from "../components/Detail";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviesDetails, setMoviesDetails] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wishlist"));
        const wishlistData = querySnapshot.docs.map((doc) => doc.data());
        setWishlist(wishlistData);

        const promises = wishlistData.map(async (item) => {
          const url = `${import.meta.env.VITE_MOVIE_API_URL}/movie/${
            item.movie_id
          }?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`;
          const response = await fetch(url);
          return response.json();
        });

        setMoviesDetails(await Promise.all(promises));
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-2xl font-bold px-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {moviesDetails.length > 0 ? (
          moviesDetails.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
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
