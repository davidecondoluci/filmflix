import React from "react";

function Search({ handleSearchInput }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search for a Movie..."
          onChange={handleSearchInput}
        />
      </div>
    </form>
  );
}

export default Search;
