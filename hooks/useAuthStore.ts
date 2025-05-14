import create from 'zustand';

interface AuthState {
  isSignedUp: boolean;
  isLoggedIn: boolean;
  username: string | null;
  signUp: (username: string, password: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isSignedUp: false,
  isLoggedIn: false,
  username: null,
  signUp: (username, password) => {
    // For simplicity, store username and password in localStorage (not secure, just for demo)
    localStorage.setItem('auth_username', username);
    localStorage.setItem('auth_password', password);
    set({ isSignedUp: true });
  },
  login: (username, password) => {
    const storedUsername = localStorage.getItem('auth_username');
    const storedPassword = localStorage.getItem('auth_password');
    if (username === storedUsername && password === storedPassword) {
      set({ isLoggedIn: true, username });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isLoggedIn: false, username: null });
  },
}));
