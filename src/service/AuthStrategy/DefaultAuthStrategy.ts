import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from "../../TokenService";
import { Token } from "../../types/token";
import { NativeAccount, User } from "../../types/user";
import { hashPassword } from "../../util/password";
import authStoreFactory from "../AuthStore/AuthStoreFactory";
import refreshStoreFactory from "../RefreshStore/RefreshStoreFactory";
import IAuthStrategy from "./IAuthStrategy";
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
  LogoutResponse,
} from "./types";

export default class DefaultAuthStrategy implements IAuthStrategy {
  async register(args: RegisterArgs): Promise<RegisterResponse> {
    const hashedPassword = await hashPassword(args.password);

    const user = await authStoreFactory().createNativeUser({
      email: args.email,
      name: args.name,
      password: hashedPassword,
    });

    const token = generateAccessToken({
      _id: user.id,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
    });

    const refreshToken = generateRefreshToken();
    await refreshStoreFactory().setRefreshToken(user.id, refreshToken);

    return {
      token,
      refreshToken,
    };
  }

  async userDetails(args: UserDetailsArgs): Promise<UserDetailsResponse> {
    throw new Error("Method not implemented.");
  }

  async refreshToken(args: RefreshTokenArgs): Promise<RefreshTokenResponse> {
    throw new Error("Method not implemented.");
  }

  async logout(args: LogoutArgs): Promise<LogoutResponse> {
    throw new Error("Method not implemented.");
  }

  async login(args: LoginArgs): Promise<LoginResponse> {
    throw new Error("Method not implemented.");
  }
}
