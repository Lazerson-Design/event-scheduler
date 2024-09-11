import { useState, useEffect } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    imageUrl: "", 
    description: "", 
  });

  const [events, setEvents] = useState([]);

  
  const token = localStorage.getItem('authToken');


  useEffect(() => {
    if (!token) {
      console.error("Token is not available. User is not logged in.");
      return;
    }

    const fetchEvents = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User is not logged in");
        return;
      }

      try {
        const res = await fetch("http://localhost:3001/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, organizerId: user.id }),
        });

        const data = await res.json();
        setEvents((prevEvents) => [...prevEvents, data]);
        setFormData({ title: "", date: "", location: "", imageUrl: "", description: "" });
      } catch (error) {
        console.error(error);
      }
    };

   
    if (formData.title || formData.date || formData.location) {
      fetchEvents();
    }
  }, [formData, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData }); 
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Create Event</h2>

        {/*  Name */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
            Event Name:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered input-accent w-full max-w-xs"
            placeholder="Enter event name"
          />
        </div>

        {/*  Date */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="date">
            Event Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="location">
            Event Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered input-accent w-full max-w-xs"
            placeholder="Enter event location"
          />
        </div>

        {/*  URL */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL:
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered input-accent w-full max-w-xs"
            placeholder="Enter image URL"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered input-accent w-full max-w-xs"
            placeholder="Enter event description"
          />
        </div>

        <button
          type="submit"
          className="w-full btn btn-success"
        >
          Submit
        </button>
      </form>

      {/* Event List */}
      {events.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4 text-center text-white">Created Events</h3>
          {events.map((event, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl mb-4">
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p>{event.description}</p>
              </div>
              {event.imageUrl && (
                <figure>
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="max-w-full"
                  />
                </figure>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;

