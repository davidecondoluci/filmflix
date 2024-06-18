import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Card from "../components/Card";
import Detail from "../components/Detail";
import useScrollBlock from "../hooks/useScrollBlock";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await supabase.from("wishlist").select();
        setWishlist(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchWishlist();
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    if (selectedMovie) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [selectedMovie, blockScroll, allowScroll]);

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-2xl font-bold px-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {wishlist ? (
          wishlist.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
        {selectedMovie && (
          <Detail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
