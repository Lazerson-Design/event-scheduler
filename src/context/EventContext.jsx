import { createContext, useState, useEffect } from "react";

// Create the EventContext
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Function to create a new event
  const createEvent = async (formData) => {
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
      setEvents((prevEvents) => [...prevEvents, data]);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

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
        setEvents(data);
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
