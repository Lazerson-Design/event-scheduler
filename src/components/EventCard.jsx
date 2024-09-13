const EventCard = ({
  title,
  date,
  location,
  description,
  selectedImageUrl,
}) => {
  // Fallback to local storage if selectedImageUrl is not passed in as a prop
  const imageUrl = selectedImageUrl || localStorage.getItem("selectedImageUrl");

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        {/* Placeholder for the event image */}
        <img
          src={imageUrl}
          alt="Event Image Placeholder"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        {/* Event title */}
        <h2 className="card-title">{title}</h2>

        {/* Event date */}
        <p>
          <strong>Date:</strong> {new Date(date).toLocaleDateString("de-DE")}
        </p>

        {/* Event location */}
        <p>
          <strong>Location:</strong> {location}
        </p>

        {/* Event description */}
        <p>{description}</p>

        <div className="card-actions justify-end">
          {/* Placeholder for action buttons (could be 'Buy Now', 'More Info', etc.) */}
          <button className="btn btn-success text-white">Details</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
