import { jwtDecode } from "jwt-decode";

export function getRoleFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("DECODED JWT:", decoded); // TEMP DEBUG
    return decoded.role;
  } catch {
    return null;
  }
}
