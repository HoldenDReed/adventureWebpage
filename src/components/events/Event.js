import { Link } from "react-router-dom";

export const Event = ({ id, name, description, date, img }) => {
  return (
    <section className="event">
      <div>
        <Link to={`/eventDetails/${id}`}>Event: {name}</Link>
      </div>
      <div>{description.substring(0, 30)}...</div>
      <div>Date: {date}</div>
      <div>
        <img src={img}></img>
      </div>
    </section>
  );
};
