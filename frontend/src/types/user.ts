export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: User;
  tokens: AuthTokens;
};
