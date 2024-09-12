import { useState, useEffect } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    // imageUrl: "",
    description: "",
  });

  const [events, setEvents] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const createEvent = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            organizerId: 4,
          }),
        });

        if (!res.ok) {
          throw new Error(
            `Fehler beim Erstellen des Events: ${res.statusText}`
          );
        }

        const data = await res.json();
        setEvents((prevEvents) => [...prevEvents, data]);

        setFormData({
          title: "",
          date: "",
          location: "",
          // imageUrl: "",
          description: "",
        });
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    if (submitForm) {
      createEvent();
      setSubmitForm(false);
    }
  }, [submitForm, formData, token, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitForm(true);
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Create Event
        </h2>

        {/* Event Name */}
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
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

        {/* Event Date */}
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="date"
          >
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

        {/* Event Location */}
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="location"
          >
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

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
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

        <button type="submit" className="w-full btn btn-success">
          Submit
        </button>
      </form>

      {/* Event List */}
      
      {events.length > 0 && (

        <div className=" bg-gray-800 mt-8 w-full max-w-md" style={{ width: "100%", maxWidth: "400px" }}>
          <h3 className="text-xl font-bold mb-4 text-center text-white">
            Created Events
          </h3>
          {events.map((event, index) => (
            <div key={index} className="card bg-base-100 w-96 shadow-xl mb-4 m-auto">
              <div className="card-body">
                <h2 className="card-title text-gray-50">{event.title}</h2>
                <p className="text-gray-50">{event.description}</p>
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
