import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext"; // Use curly braces if it's a named export
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CreateEventPage from "./pages/CreateEventPage";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventDetailsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
          </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
