import { useGetUser, useLoginUser } from "@/api/hooks/users";
import { DefaultProviderType, UserType } from "@/common/types/authcontext";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const defaultAuthProvider: DefaultProviderType = {
  user: null,
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

const AuthContext = createContext(defaultAuthProvider);

export const AuthProvider = (props: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const parseJwt = (token: string) => {
    if (token) {
      const base64Url = token.split(".")[1];

      // Replace characters - and _ in the base64 string with + and / respectively to make it a valid base64 string.
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      try {
        return JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
      } catch (error) {
        return null;
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const decodedJwt = parseJwt(token || "");
    const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();
    setIsTokenValid(isTokenValid);

    if (!isTokenValid) {
      setUser(null);
      router.replace("/auth/login");
    }
  }, []);

  const { data, isLoading } = useGetUser(isTokenValid);

  const { mutateAsync: loginUser } = useLoginUser();

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    if (res.status) {
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        router.push("/dashboard");
      }, 10);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsTokenValid(false);
  };

  if (isLoading) {
    return (
      <div>
        <h4>Loading ....</h4>
        <p>Wait as we intialize the application</p>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ logout, login, user: data?.user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
