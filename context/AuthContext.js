import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged;
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
