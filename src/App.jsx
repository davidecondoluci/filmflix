import "./App.css";

import { Route, Routes } from "react-router-dom";

import Archive from "./pages/Archive";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Archive />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
};

export default App;
