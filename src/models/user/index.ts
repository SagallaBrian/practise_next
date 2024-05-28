export interface userForm {
  email: string;
  password: string;
}
export interface UserSignUpResp {
  status: string;
  data: {
    email: string;
    name: string;
    phone_number: string;
    token: string;
    role: number;
  };
}
export interface UserSignUpRsq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface UserSignInResp {
  status: string;
  token: string;
  data: {
    avatar: string;
    email: string;
    name: string;
    phone_number: string;
    role: number;
  };
}
export interface UserSignInRsq {
  email: string;
  password: string;
}

export interface UserType {
  avatar: string;
  email: string;
  name: string;
  phone_number: string;
  role: number;
  language?: string;
  otp?: number;
  resetPasswordToken?: string;
  updatedAt?: string;
  createdAt?: string;
}
