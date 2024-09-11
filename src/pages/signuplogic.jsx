{
  /* BASIC FUNKTIONEN FÜR SIGN UP */
}
// Importing necessary hooks from React and react-router-dom
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Defining the SignUp functional component
const SignUp = () => {
  // Using useState to manage form data (email and password) as a state object
  const [formData, setFormData] = useState({
    email: "", // Initial state for email
    password: "", // Initial state for password
  });

  // Using the useNavigate hook to programmatically navigate the user to a different route
  const navigate = useNavigate();

  // Handler function for form input changes. This function is called whenever the user types in the form fields.
  // It updates the formData state with the new input value.
  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev, // Spread the previous state
      [e.target.name]: e.target.value, // Dynamically update the specific field (either email or password) based on the input field's name
    }));

  // Handler function for form submission. This function is called when the form is submitted.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    try {
      // Sending a POST request to the server to register a new user.
      // Using import.meta.env to access environment variables (VITE_API_URL in this case).
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/users", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Sending the request as JSON
        },
        body: JSON.stringify(formData), // Converting the form data (email and password) into a JSON string for the request body
      });

      // Parsing the response data as JSON
      const data = await res.json();
      console.log(data); // Logging the response data (e.g., success message, user data)

      // Navigating to the login page after successful registration
      navigate("/login");
    } catch (error) {
      // Logging any error that occurs during the request
      console.error(error);
    }
  };

  // The return statement defines the UI of the component
  return (
    <div>
      {/* Displaying a title for the sign-up form */}
      Sign up for our awesome service
      {/* Form element, onSubmit triggers handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Input field for email, name and value are bound to the formData state */}
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email} // Controlled input, value is bound to formData.email
          onChange={handleChange} // Calls handleChange when the input changes
        />
        <br />
        {/* Input field for password */}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password} // Controlled input, value is bound to formData.password
          onChange={handleChange} // Calls handleChange when the input changes
        />
        <br />
        {/* Submit button */}
        <button>Submit</button>
      </form>
    </div>
  );
};

// Exporting the SignUp component as the default export
export default SignUp;
