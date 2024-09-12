import React, { useEffect, useState, useContext } from "react";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  useEffect(() => {
    // When the component mounts or when isLoggedIn changes, we check if the modal should be shown
    const modalElement = document.getElementById("sign_up_modal");
    // If the user is not logged in and the modal element is found, show the modal
    if (!isLoggedIn && modalElement) {
      modalElement.showModal(); // Opens the sign-up modal if the user is not logged in
    }
  }, [isLoggedIn]); // Re-run this effect if the isLoggedIn state changes

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Set the login state to true once the user successfully logs in
    // Close the modal once the user logs in successfully
    document.getElementById("sign_up_modal").close();
  };

  return (
    <div className="container mx-auto">
      <Navbar/>
      {/* Conditionally render content based on the user's login status */}
      {!isLoggedIn ? (
        // If not logged in, prompt the user to log in or sign up
        <>
          <p>Please sign up or log in to access the content.</p>
          {/* Render the SignUpPage component and pass the onLoginSuccess handler as a prop */}
          <SignUpPage onLoginSuccess={handleLoginSuccess} />
        </>
      ) : (
        // If logged in, show the homepage content and a log-out button
        <div>
          <h1>Welcome to the HomePage!</h1>
          {/* Log out button to reset the login state */}
          <button onClick={() => onLogout()}>Log Out</button>
        </div>
      )}
    </div>
  );
}
