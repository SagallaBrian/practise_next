import { useGetUser, useLoginUser } from "@/api/hooks/users";
import { DefaultProviderType } from "@/common/types/authcontext";
import { UserType } from "@/models/user";
import { useRouter } from "next/router";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const defaultAuthProvider: DefaultProviderType = {
  isAuthenticated: false,
  user: null,
  isLoadingUser: false,
  isLoginLoading: false,
  isloadingPending: true,
  login: async (email: string, password: string) => {},
  logout: async () => {},
};

const AuthContext = createContext(defaultAuthProvider);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

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
    const token = localStorage.getItem("token") || '';
    const decodedJwt = parseJwt(token || "");
    const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();
    setIsTokenValid(isTokenValid);

    if (!isTokenValid && !router.pathname.startsWith("/auth")) {
      setUser(null);
      router.replace("/auth/login");
    }
  }, [router]);

  const {
    data,
    isLoading: isLoadingUser,
    isPending: isloadingPending,
  } = useGetUser(isTokenValid);

  const {
    mutateAsync: loginUser,
    isPending: isLoginLoading,
    data: loginData,
  } = useLoginUser();

  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password });
      if (res.status) {
        localStorage.setItem("token", res.token);
        setUser(res.data);
        setIsTokenValid(true);

        router.push("/dashboard");

        // setTimeout(() => {
        // }, 10);
      } else {
        setLoginError("Failed to login. Please try again.");
      }
    } catch (err) {
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  const logout = async () => {
    setUser(null);
    setIsTokenValid(false);
    localStorage.removeItem("token");
    router.replace(`/auth/login?returnUrl=${router.asPath}`);
  };

  if (isLoadingUser) {
    return (
      <div>
        <h4>Loading ....</h4>
        <p>Wait as we intialize the application</p>
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        isAuthenticated: isTokenValid,
        user: loginData?.data || data?.data || null,
        isLoginLoading,
        isLoadingUser,
        isloadingPending,
      }}
    >
      {children}
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

export const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, logout, isLoadingUser, isloadingPending } =
    useAuth();

  useEffect(() => {
    if (
      !isloadingPending &&
      !isLoadingUser &&
      !isAuthenticated &&
      !router.pathname.startsWith("/auth")
    ) {
      logout();
    }
  }, [router.pathname, isAuthenticated]);

  return <>{children}</>;
};
