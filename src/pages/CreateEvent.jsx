import { useContext, useState, useEffect } from "react";
import { EventContext } from "../context/EventContext"; // Import the EventContext to access shared event state
import EventCard from "../components/EventCard"; // Import EventCard component
import ImagePicker from "./ImagePicker";

const CreateEvent = () => {
  // Form state to manage the input fields for creating an event
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // State for managing image selection
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // Load the selected image from local storage on component mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem("selectedImageUrl");
    if (storedImageUrl) {
      setSelectedImageUrl(storedImageUrl);
    }
  }, []);

  // Function to store selected image URL in local storage
  const handleImageSelect = (url) => {
    setSelectedImageUrl(url);
    localStorage.setItem("selectedImageUrl", url); // Store the selected image URL in local storage
  };

  // Get the createEvent function and events state from EventContext
  const { createEvent, events } = useContext(EventContext); // Use useContext to access event-related logic and state

  // Submit handler for the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the createEvent function from EventContext, passing the form data
    createEvent({ ...formData });

    // Reset the form after submission
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
    });
  };

  // Change handler for form fields
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex items-center justify-center py-4 flex-col">
      <form
        onSubmit={handleSubmit} // Form submission is handled here
        className="bg-base-100 shadow-md flex flex-col rounded-xl px-8 pt-6 pb-8 mb-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Create Event
        </h2>

        {/* Event Name */}
        <div className="mb-4">
          {/*  <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Event Name:
          </label> */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange} // Update form data when user types
            className="input input-bordered items-center w-full"
            placeholder="Enter event name"
          />
        </div>

        {/* Event Date */}
        <div className="mb-4">
          {/* <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="date"
          >
            Event Date:
          </label> */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange} // Update form data when user types
            className="input input-bordered items-center w-full"
          />
        </div>

        {/* Event Location */}
        <div className="mb-4">
          {/* <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="location"
          >
            Event Location:
          </label> */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange} // Update form data when user types
            className="input input-bordered items-center w-full"
            placeholder="Enter event location"
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          {/* <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label> */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange} // Update form data when user types
            className="input input-bordered items-center py-2 w-full"
            placeholder="Enter event description"
          />
        </div>

        {/* Image Upload + Preview (handled separately) */}
        <div className="flex justify-between mt-4 pb-4">
          <ImagePicker onImageSelect={handleImageSelect} />

          <div className="border border-neutral w-40 h-12 rounded-lg text-right">
            <div className="w-full h-full rounded-lg overflow-hidden">
              {selectedImageUrl ? (
                <img
                  src={selectedImageUrl}
                  alt="Selected"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>No image</span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full btn btn-success  text-white">
          Submit
        </button>
      </form>

      {/* Display created events as cards */}
      {/*
      <div className="flex flex-wrap gap-4 justify-center">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            location={event.location}
            description={event.description}
          />
        ))}
      </div>
      */}
    </div>
  );
};

export default CreateEvent;
