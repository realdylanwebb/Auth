export interface AccessToken extends AccessTokenPayload {
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
}

export interface AccessTokenPayload {
  _id: string;
  user: {
    id: string;
    email: string;
    roles: string[];
  };
}
