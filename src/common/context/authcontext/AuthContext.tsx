import { createContext, useContext } from "react";
import { AuthProviderProps } from "./types";

// ** Defaults
export const defaultAuthProvider = {
  isAuthenticated: false,
  isOtpVerified: false,
  userRole: null,
  user: null,
  loading: false,
  signup: async (name: string, email: string, password: string) => {},
  login: async (email: string, password: string) => {},
  logout: async () => {},
  updateUser: async (f: any) => false,
  resendOTP: async (email: string) => false,
  verifyOTP: async ({
    email,
    OTP,
    phoneNumber,
    isLogin,
  }: {
    email: string;
    OTP?: string | undefined;
    phoneNumber?: string | undefined;
    isLogin?: boolean;
  }) => false,
};

const AuthContext = createContext(defaultAuthProvider);
// function AuthContext() {
//   return (
//     <div>AuthContext</div>
//   )
// }

// export default AuthContext

export const AuthProvider = (params: AuthProviderProps) => {};

// Custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
