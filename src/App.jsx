import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CreateEventPage from "./pages/CreateEventPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
