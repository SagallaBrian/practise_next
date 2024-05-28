import { UserType } from "@/models/user";

export interface DefaultProviderType {
  isAuthenticated: boolean;
  // isOtpVerified: boolean;
  // userRole: null | number;
  user: null | UserType;
  isLoadingUser: boolean;
  isLoginLoading: boolean;
  isloadingPending: boolean;
  // signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
