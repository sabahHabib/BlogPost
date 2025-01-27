import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export function isTokenExpired(token: string): boolean {
  const decoded: DecodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

export function decodeToken(token: string): DecodedToken {
  return jwtDecode(token);
}
