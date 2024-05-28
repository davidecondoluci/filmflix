import React from "react";

function Search() {
  return (
    <div className="search-bar mb-8">
      <form className="flex">
        <input
          type="text"
          placeholder="Search for a Movie..."
          className="search p-2 border border-gray-300 rounded-l-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
