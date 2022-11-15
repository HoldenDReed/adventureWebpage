import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventDetails.css"


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
      <header>
        <div>
          <span><Link to={`/eventDetails/${id}`}>Event: {name}</Link></span>
          {
            userObject.staff
            ? <>
                <button onClick={() => {
                  fetch(`http://localhost:8088/events/${id}`, {
                    method: "DELETE"})
                    .then (window.location.reload(false))
                }}
              >Delete Post</button></>
            : ""
          }
          <span>
          {
            userObject.staff
              ? ""
              : <>
                  {
                    isFavorite
                      ? "⭐"
                      : <button onClick={async () => {
                        await fetch(`http://localhost:8088/favorites`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            userId: userObject.id,
                            eventId: id
                          })
                        })
                        window.location.reload(false)
                      }}
                      >☆ Add to Favorites</button>
                  }
                </>
            }
          </span>
        </div>
        <div>{description.substring(0, 30)}...</div>
        <div>Date: {date}</div>
      </header>
      <div>
        <img src={img}></img>
      </div>
    </section>
  );
};
