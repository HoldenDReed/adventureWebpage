import { useEffect, useState } from "react";
import { Event } from "../events/Event";

export const Favorites = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);
  
  

  
  const [favorites, setFavorites] = useState([])
  
  useEffect(
    () => {
      const fetchFavorites = async () => {
        const response = await fetch(`http://localhost:8088/favorites?userId=${userObject.id}&_expand=event`)
        const responseJSON = await response.json()
        setFavorites(responseJSON)
      }
        fetchFavorites()
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
            key={`event--${event?.event?.id}`}
            id={event?.event?.id}
            name={event?.event?.name}
            description={event?.event?.description}
            date={event?.event?.date}
            img={event?.event?.img} 

          />
          <button
          onClick={() => 
            {
              const deleteFavorite  = async () => {
              await fetch(`http://localhost:8088/favorites/${event.id}`, {
                method: "DELETE"
              })
              .then(()=>  {
                 
              })
              window.confirm("are you sure? ")
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
