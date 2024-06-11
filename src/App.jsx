import "./App.css";

import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Archive from "./pages/Archive";
import Wishlist from "./pages/Wishlist";

import { AuthProvider } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Archive />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
