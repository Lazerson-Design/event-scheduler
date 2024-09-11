import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export default function SignUpPage() {
  useEffect(() => {
    const modalElement = document.getElementById("sign_up_modal");
    if (modalElement) {
      modalElement.showModal();
    }
  }, []); // This ensures the modal opens automatically when the component mounts

  const handleCloseModal = () => {
    const modal = document.getElementById("modal-container");
    if (modal) {
      modal.close(); // Close the modal using the dialog API
    }
  };

  // Access the onLoginSuccess from AuthContext
  const { onLoginSuccess } = useContext(AuthContext); // Use context for login success

  // Adding useState to manage form data (email, password, confirm password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Adding confirm password for validation logic
  });

  // useNavigate hook to programmatically navigate after successful sign-up
  const navigate = useNavigate();

  // Handle input changes for all form fields
  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev, // Preserve previous state
      [e.target.name]: e.target.value, // Update the state for the field that changed
    }));

  // Clear form data after successful sign-up
  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "", // Reset confirmPassword
    });
  };

  // Handle form submission to sign up the user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!"); // Show an alert if they don't match
      return; // Prevent form submission if passwords don't match
    }

    // Log the form data before making the API call
    console.log("Form Data:", formData);

    try {
      // API call to sign up the user
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      /* ERROR MESSAGES */
      if (res.status === 409) {
        // Handle user already exists error
        alert("User with this email already exists.");
        return;
      }

      if (!res.ok) {
        // Handle other errors
        throw new Error("Something went wrong!");
      }

      const data = await res.json();
      console.log(data);

      // Clear form after successful sign-up
      clearForm();

      // Navigate to login page after successful sign-up
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Sign Up Modal */}
      <dialog id="sign_up_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign Up</h3>

          {/* Updated form to handle form submission and controlled inputs */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email" // Name attribute for state binding
                value={formData.email} // Bind to formData.email
                onChange={handleChange} // Update state on input change
                required
              />
            </label>

            {/* Password Input */}
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password" // Name attribute for state binding
                value={formData.password} // Bind to formData.password
                onChange={handleChange} // Update state on input change
                required
              />
            </label>

            {/* Confirm Password Input */}
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                name="confirmPassword" // Name attribute for state binding
                value={formData.confirmPassword} // Bind to formData.confirmPassword
                onChange={handleChange} // Update state on input change
                required
              />
            </label>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div>
                {/* Link to Sign In for users who already have an account */}
                <p className="inline mr-2">Already have an account?</p>
                <button
                  type="button"
                  className="btn btn-active btn-neutral"
                  onClick={() => {
                    handleCloseModal(); // Close this modal
                    navigate("/signin"); // Navigate to Sign-In
                  }} // Use navigate to redirect to the Sign In page
                >
                  Sign In
                </button>
              </div>
              {/* Sign Up Button to submit the form */}
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  handleCloseModal();
                }}
              >
                Sign Up!
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
