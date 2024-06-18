import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Card from "../components/Card";

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

  console.log(wishlist);

  return (
    <div className="flex flex-col justify-center pt-24">
      <h1 className="text-2xl font-bold px-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8 px-8">
        {wishlist ? (
          wishlist.map((item) => (
            <Card key={item.id} movie={item} onClick={() => {}} />
          ))
        ) : (
          <p>Loading wishlist...</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
