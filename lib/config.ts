// lib/config.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://flappier-ronald-edgily.ngrok-free.dev/api";

export const API = {
  login: `${API_BASE_URL}/auth/login`,
  facebookConnect: `${API_BASE_URL}/auth/facebook/connect`,
  // etc.
};