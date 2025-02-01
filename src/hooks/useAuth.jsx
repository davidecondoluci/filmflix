import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { auth } from "../utils/firebaseClient"; // ⬅️ Cambiato da "firebase" a "auth"
import { signOut } from "firebase/auth"; // ⬅️ Importiamo signOut da Firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // Funzione login (da implementare con Firebase)
  const login = async (data) => {
    setUser(data);
    navigate("/wishlist");
  };

  // Funzione logout con Firebase
  const logout = async () => {
    setUser(null);
    await signOut(auth); // ⬅️ Ora usiamo signOut correttamente
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
