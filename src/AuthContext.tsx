import { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextDefault {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextDefault>({
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
