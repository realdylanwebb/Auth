export interface LoginArgs {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface RegisterArgs {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
  refreshToken: string;
}

export interface UserDetailsArgs {
  token: string;
}

export interface UserDetailsResponse {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface RefreshTokenArgs {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface LogoutArgs {
  refreshToken: string;
  accessToken: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ForgotPasswordArgs {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}
