import React, { useEffect } from "react";
import SignUpPage from "./SignUpPage"; // Make sure to import the SignUpPage

export default function HomePage() {
  useEffect(() => {
    // Automatically show the sign-up modal when the component mounts
    document.getElementById("sign_up_modal").showModal();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="container mx-auto">
      {/* Render the SignUpPage, which contains the modal */}
      <SignUpPage />
    </div>
  );
}
