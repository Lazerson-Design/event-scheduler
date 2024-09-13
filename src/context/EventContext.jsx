import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Create the EventContext
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  /* const token = localStorage.getItem("token"); */
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (isLoggedIn) setToken(localStorage.getItem("token"));
  }, [isLoggedIn]);
  // Function to create a new event
  const createEvent = async (formData) => {
    console.log(formData, userId, token);
    try {
      const res = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          organizerId: userId, // Use userId from localStorage
        }),
      });

      if (!res.ok) {
        throw new Error(`Error creating event: ${res.statusText}`);
      }

      const data = await res.json();
      // Ensure prevEvents is an array before updating it
      /* setEvents((prevEvents) =>
        Array.isArray(prevEvents) ? [...prevEvents, data] : [data]
      ); */
      setEvents((prevEvents) => [...prevEvents, data]);
    } catch (error) {
      console.error("API request error:", error);
    }
  };
  console.log(events);
  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Ensure data is an array, or fallback to an empty array
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <EventContext.Provider value={{ events, createEvent }}>
      {children}
    </EventContext.Provider>
  );
};
