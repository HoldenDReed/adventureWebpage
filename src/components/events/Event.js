import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Event = ({ id, name, description, date, img }) => {

  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);


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
      <footer>
        <button onClick={() => {
          fetch(`http://localhost:8088/favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId: userObject.id,
              eventId: id
            })
          })
        }}
        >Add to Favorites</button>
      </footer>
    </section>
  );
};
