import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoHeartCircle } from "react-icons/io5";
import { db } from "../utils/firebaseClient"; // Corretto import
import { useAuth } from "../hooks/useAuth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistDocId, setWishlistDocId] = useState(null); // Per salvare l'ID del documento in Firestore

  useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        const q = query(
          collection(db, "wishlist"),
          where("movie_id", "==", movie.id),
          where("user_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsInWishlist(true);
          setWishlistDocId(querySnapshot.docs[0].id); // Salva l'ID del documento
        } else {
          setIsInWishlist(false);
          setWishlistDocId(null);
        }
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
      try {
        await deleteDoc(doc(db, "wishlist", wishlistDocId));
        setIsInWishlist(false);
        setWishlistDocId(null);
      } catch (error) {
        console.error("Error removing from wishlist:", error.message);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "wishlist"), {
          movie_id: movie.id,
          user_id: user.uid,
        });
        setIsInWishlist(true);
        setWishlistDocId(docRef.id);
      } catch (error) {
        console.error("Error adding to wishlist:", error.message);
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
