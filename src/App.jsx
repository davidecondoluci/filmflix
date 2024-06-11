import "./App.css";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Archive from "./pages/Archive";
import Wishlist from "./pages/Wishlist";

import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Archive />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
