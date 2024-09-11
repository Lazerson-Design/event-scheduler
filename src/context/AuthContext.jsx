import { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide auth state and functions
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login success
  const onLoginSuccess = () => {
    setIsLoggedIn(true);
    console.log("User is logged in");
  };

  // Handle logout
  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Remove the token on logout
  };

  // Provide the values to the components
  return (
    <AuthContext.Provider value={{ isLoggedIn, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
