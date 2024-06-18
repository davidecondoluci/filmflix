import React, { useState } from "react";

function Search({ handleSearchInput, searchTerm }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleSearchInput(e);
  };

  return (
    <div className="sticky top-0 z-10 w-full flex flex-col items-center bg-white">
      <form className="lg:w-1/4 py-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Search for a Movie..."
            onChange={handleChange}
            value={inputValue}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
