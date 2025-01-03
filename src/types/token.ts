export interface Token {
  _id: string;
  token: string;
  user: {
    id: string;
    email: string;
    roles: string[];
  };
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
}
