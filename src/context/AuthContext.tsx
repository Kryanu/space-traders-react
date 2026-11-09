import { createContext, useContext, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';

export type AuthState = { token?: string; symbol?: string };

// Provided by the shell via mount(el, { auth }). Keep in sync with the shell's authStore.
export type ShellAuth = {
  getState: () => AuthState;
  subscribe: (listener: (state: AuthState) => void) => () => void;
  login: (symbol: string) => Promise<void>;
  register: (symbol: string, faction: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<ShellAuth | undefined>(undefined);

export function AuthProvider({
  auth,
  children,
}: {
  auth: ShellAuth;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  const state = useSyncExternalStore(auth.subscribe, auth.getState);
  return { ...state, isAuth: !!state.token, auth };
}
