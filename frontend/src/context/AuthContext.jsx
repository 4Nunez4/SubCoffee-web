import { createContext,  useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUsers] = useState([])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setUsers }} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext