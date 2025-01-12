import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "../../TokenService";
import { hashPassword } from "../../util/password";
import accessTokenBlacklistFactory from "../AccessTokenBlackList/AccessTokenBlacklistFactory";
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
    const { token } = args;
    const payload = verifyAccessToken(token);

    const user = await authStoreFactory().getUserById(payload.user.id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    };
  }

  async refreshToken(args: RefreshTokenArgs): Promise<RefreshTokenResponse> {
    const { refreshToken } = args;

    const userId = await refreshStoreFactory().getUserByRefreshToken(
      refreshToken
    );

    if (!userId) {
      throw new Error("Invalid refresh token");
    }

    const user = await authStoreFactory().getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const token = generateAccessToken({
      _id: user.id,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
      },
    });

    return {
      token,
    };
  }

  async logout(args: LogoutArgs): Promise<void> {
    const { accessToken, refreshToken } = args;

    await refreshStoreFactory().deleteRefreshToken(refreshToken);
    await accessTokenBlacklistFactory().addAccessToken(accessToken);
  }

  async login(args: LoginArgs): Promise<LoginResponse> {
    throw new Error("Method not implemented.");
  }
}
