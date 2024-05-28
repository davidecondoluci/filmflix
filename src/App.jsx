import React from "react";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Movie Storage</h1>
      <Search />
    </div>
  );
};

export default App;
