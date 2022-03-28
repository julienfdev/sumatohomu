import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import requester from "../../modules/requester";

interface AuthContextType {
  token: string | null;
  signin: (
    user: string,
    password: string,
    callback?: (err?: any) => Promise<void>
  ) => Promise<void>;
  signout: (callback?: VoidFunction) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider: FunctionComponent = ({ children }) => {
  // Signin etc...
  const [token, setToken] = useState<string | null>(null);
  const signin = async (
    user: string,
    password: string,
    callback?: (err?: any) => void
  ) => {};
  const signout = async (callback?: VoidFunction) => {};

  // Try to get the token at mount
  useEffect(() => {
    if (!token) {
      const value = localStorage.getItem("sumatohomu_token");
      if (value) {
        setToken(value);
        requester.defaults.headers.common = {
          ...requester.defaults.headers.common,
          Authorization: `Bearer ${value}`,
        };
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
