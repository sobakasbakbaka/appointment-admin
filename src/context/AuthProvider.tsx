import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// import { kyInstance } from "../api/kyInstance.ts";
import ky from "ky";

interface AuthContextProps {
  isLoggedIn: boolean;
  loading: boolean;
  setLoggedIn: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = (await ky
          .post(
            "https://appointment-production-0841.up.railway.app/api/auth/check-auth",
            {
              credentials: "include",
            }
          )
          .json()) as { message: string };

        if (response.message === "Authorized") {
          setLoggedIn(true);
        }
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
