export interface BaseAccount {
  type: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NativeAccount extends BaseAccount {
  type: "native";
  password: string;
}

export interface OAuthAccount extends BaseAccount {
  type: "oauth";
  scopes: string[];
  provider: string;
  providerId: string;
  accessToken: string;
  refreshToken?: string;
}

export type Account = NativeAccount | OAuthAccount;

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  roles: string[];
  accounts: Account[];
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
