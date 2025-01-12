import {
  LoginArgs,
  LoginResponse,
  RegisterArgs,
  RegisterResponse,
  UserDetailsArgs,
  UserDetailsResponse,
  RefreshTokenArgs,
  RefreshTokenResponse,
  LogoutArgs,
} from "./types";

export default interface IAuthStrategy {
  login(args: LoginArgs): Promise<LoginResponse>;
  register(args: RegisterArgs): Promise<RegisterResponse>;
  userDetails(args: UserDetailsArgs): Promise<UserDetailsResponse>;
  refreshToken(args: RefreshTokenArgs): Promise<RefreshTokenResponse>;
  logout(args: LogoutArgs): Promise<void>;
}
