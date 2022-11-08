import { Link } from "react-router-dom";

export const Event = ({ id, name, description, date, img }) => {
  return (
    <section className="event">
      <div>
        <Link to={`/eventDetails/${id}`}>Name: {name}</Link>
      </div>
      <div>Description: {description}</div>
      <div>Date: {date}</div>
      <div>
        <img src={img}></img>
      </div>
    </section>
  );
};
