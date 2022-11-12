import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Event = ({ id, name, description, date, img }) => {

  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(
    () => {
      const checkIfFavorite = async () => {
        const response = await fetch(`http://localhost:8088/favorites?userId=${userObject.id}&eventId=${id}`)
        const responseJSON = await response.json()
        const responseLength = await responseJSON.length
        // console.log(responseLength)
        if (await responseLength === 0) {
          setIsFavorite(false)
        } else {
          setIsFavorite(true)
        }
      }
      checkIfFavorite()
    },
    []
  )

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
        {
          !isFavorite && !userObject.staff
          ? <button onClick={() => {
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
            : ""
        }
      </footer>
    </section>
  );
};
