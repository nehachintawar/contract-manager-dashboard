import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds and compare
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Assume expired if decoding fails
  }
};
