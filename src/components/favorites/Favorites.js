import { useEffect, useState } from "react";
import { Event } from "../events/Event";
import "./Favorites.css"

export const Favorites = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);
  
  

  
  const [favorites, setFavorites] = useState([])
  
  useEffect(
    () => {
      const fetchFavorites = async () => {
        const response = await fetch(`http://localhost:8088/users/${userObject.id}?_embed=favorites`)
        const responseJSON = await response.json()
        return responseJSON.favorites
      }

      const fetchEvents = async () => {
        const response = await fetch('http://localhost:8088/events?_expand=eventCategories')
        return response.json()
      }

      const filterFavoriteEvents = async () => {
        const favoritesArray = await fetchFavorites()
        const eventsArray = await fetchEvents()
        let userEventsArray = []
        for (const favorite of favoritesArray) {
          for (const event of eventsArray) {
            if (favorite.eventId === event.id) {
              userEventsArray.push(event)
            }
          }
        }
        setFavorites(userEventsArray)
      }
      filterFavoriteEvents()
    },
    []
  )

  return (
    <>
      <div>
        <h2>Favorites Page</h2>
        <article className="events">
        {favorites.map((event) => (
           
        
            
          <>
          <Event
            key={`event--${event.id}`}
            id={event.id}
            name={event.name}
            description={event.description}
            date={event.date}
            img={event.img} 

          />
          <button
          onClick={() => 
            {
              const deleteFavorite = async () => {
              await fetch(`http://localhost:8088/favorites/${event.id}`, {method: "DELETE"})
              window.location.reload(false)
            }
            deleteFavorite()
          }
        }
          className="btn btn-primary"
        >Delete</button> 
         </>
        
        ))}
      </article>
      </div>
    </>
  );
};
