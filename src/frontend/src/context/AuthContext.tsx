import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

export type UserRole = "owner" | "visitor";

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  username: string | null;
}

interface AuthContextValue extends AuthState {
  login: (username: string, role: UserRole) => void;
  logout: () => void;
}

const SESSION_KEY = "custom_auth_session";

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  userRole: null,
  username: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        return JSON.parse(stored) as AuthState;
      }
    } catch {
      // ignore
    }
    return { isAuthenticated: false, userRole: null, username: null };
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(authState));
    } catch {
      // ignore
    }
  }, [authState]);

  const login = useCallback((username: string, role: UserRole) => {
    setAuthState({ isAuthenticated: true, userRole: role, username });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthState({ isAuthenticated: false, userRole: null, username: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
