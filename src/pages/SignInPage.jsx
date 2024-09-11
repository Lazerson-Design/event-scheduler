import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export default function SignInPage() {
  useEffect(() => {
    // Automatically add 'modal-open' class to open the modal
    const modalElement = document.getElementById("sign_in_modal");
    if (modalElement) {
      modalElement.showModal(); // Open modal when component mounts
    }
  }, []); // This ensures the modal opens automatically when the component mounts

  const handleCloseModal = () => {
    const modalElement = document.getElementById("sign_in_modal");
    if (modalElement) {
      modalElement.close(); // Close modal when called
    }
  };

  // Access the onLoginSuccess from AuthContext
  const { onLoginSuccess } = useContext(AuthContext); // Use context for login success

  // useState to manage form data for both Sign Up and Log In forms
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useNavigate hook to programmatically navigate after successful actions
  const navigate = useNavigate();

  // Handle input changes for both forms
  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  // Clear form data after successful sign-in
  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  // Handle Log In form submission
  const handleLogInSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to log in the user
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Login failed!");
      }

      const data = await res.json();
      console.log(data);

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Clear form after successful sign-in
      clearForm();

      // Check if onLoginSuccess is available
      if (typeof onLoginSuccess === "function") {
        // Call the onLoginSuccess function from the context
        onLoginSuccess();
      } else {
        console.error("onLoginSuccess is not a function");
      }

      // Close modal after successful sign-in
      handleCloseModal();

      // Redirect to HomePage after login
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Log-In Modal */}
      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Log In</h3>
          {/* Log-In form */}
          <form onSubmit={handleLogInSubmit}>
            {/* Email Input */}
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="grow"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            {/* Password Input */}
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="grow"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="inline mr-2">Don't have an account?</p>
                {/* Button to navigate to the Sign-Up page */}
                <button
                  type="button"
                  className="btn btn-active btn-neutral"
                  onClick={() => {
                    handleCloseModal(); // Close this modal
                    navigate("/signup"); // Navigate to Sign-Up
                  }}
                >
                  Sign Up!
                </button>
              </div>
              {/* Log-In Submit Button */}
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  handleCloseModal();
                }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
