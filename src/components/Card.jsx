import React from "react";
import PropTypes from "prop-types";
import { IoHeartCircle } from "react-icons/io5";
import { supabase } from "../utils/supabaseClient";
import { useAuth } from "../hooks/useAuth";

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
      className="w-full bg-lightgray text-center flex items-center justify-center"
      style={{ aspectRatio: "2 / 3" }}
    >
      Poster not found
    </div>
  );

  const { user } = useAuth();

  const [isInWishlist, setIsInWishlist] = React.useState(false);

  React.useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("wishlist")
          .select()
          .eq("movie_id", movie.id)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching wishlist:", error.message);
          return;
        }

        setIsInWishlist(data.length > 0);
      }
    };

    checkWishlist();
  }, [user, movie.id]);

  const handleWishlistToggle = async (event) => {
    event.stopPropagation();
    if (!user) {
      return;
    }

    if (isInWishlist) {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .match({ movie_id: movie.id, user_id: user.id });

      if (error) {
        console.error("Error removing from wishlist:", error.message);
      } else {
        setIsInWishlist(false);
      }
    } else {
      const { error } = await supabase
        .from("wishlist")
        .insert([{ movie_id: movie.id, user_id: user.id }]);

      if (error) {
        console.error("Error adding to wishlist:", error.message);
      } else {
        setIsInWishlist(true);
      }
    }
  };

  return (
    <div
      className="relative rounded overflow-hidden shadow-md p-4 bg-white space-y-4 cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <div>{poster}</div>
      <div className="flex items-center justify-between space-x-4">
        <div className="font-bold text-xl">{movie.title}</div>
        {user && (
          <button
            className="text-purple-500 text-3xl"
            onClick={handleWishlistToggle}
          >
            <IoHeartCircle color={isInWishlist ? "#7C4DFF" : "#607D8B"} />
          </button>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
