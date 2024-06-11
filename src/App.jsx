import "./App.css";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Archive from "./pages/Archive";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Archive />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>
    </Routes>
  );
};

export default App;
