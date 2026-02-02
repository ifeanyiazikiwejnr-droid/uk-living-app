import * as React from "react";
import { getToken, setToken as saveToken, clearToken } from "./tokenStorage";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
  (async () => {
    // ✅ Always start from the Login screen
    // (We are intentionally NOT restoring token on app load)
    setToken(null);
    setRole(null);
    setLoading(false);
    })();
  }, []);


  async function login(newToken, newRole) {
    console.log("AuthContext.login() role:", newRole);
    await saveToken(newToken);
    setToken(newToken);
    setRole(newRole || null);
  }

  async function logout() {
    await clearToken();
    setToken(null);
    setRole(null);
  }

  console.log("AuthContext render — role:", role);

  return (
    <AuthContext.Provider value={{ token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
