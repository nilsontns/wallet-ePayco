import { createContext, useContext, useState, useEffect } from "react";
import FetchService from "../FetchService";

const AuthContext = createContext<{
  user: any;
  setUser: any;
  logout: any;
  isLoading: boolean;
}>({
  user: null,
  setUser: null,
  logout: null,
  isLoading: false,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken: any = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      FetchService.setBearerToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    FetchService.removeBearerToken();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthContext);
};
