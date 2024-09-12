const EventCard = ({ title, date, location, description }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        {/* Placeholder for the event image */}
        <img
          src="https://imgs.search.brave.com/xaoKljT06qEeqGwafph0JWpyOiMnlQB0k8Aq153svDo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMw/Njg1Nzk3L3Bob3Rv/L2dyb3VwLW9mLWJ1/c2luZXNzLXBlb3Bs/ZS1zdGFuZGluZy1h/bmQtdGFsa2luZy1p/bi1vZmZpY2UuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU1v/UFZOQzBURTFyaDdC/VkV5UlJPTFpjbE1r/R2xkWEthamlMUlVP/WjhtZWM9"
          alt="Event Image Placeholder"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        {/* Event title */}
        <h2 className="card-title">{title}</h2>

        {/* Event date */}
        <p>
          <strong>Date:</strong> {date}
        </p>

        {/* Event location */}
        <p>
          <strong>Location:</strong> {location}
        </p>

        {/* Event description */}
        <p>{description}</p>

        <div className="card-actions justify-end">
          {/* Placeholder for action buttons (could be 'Buy Now', 'More Info', etc.) */}
          <button className="btn btn-success">Details</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
