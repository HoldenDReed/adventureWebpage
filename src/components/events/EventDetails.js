
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const EventDetails = () => {

  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);
  
const [event, setEvent] = useState({})
const {eventId} = useParams()
useEffect(
  () => {
 fetch(`http://localhost:8088/events/${eventId}`)
     .then (response => response.json())
     .then ((response) => {
      const eventArray = response
         setEvent(eventArray)
        
     })
  },
  [eventId]
)
return <section className="events">

  <header>{event?.name}</header>
  {
        userObject.staff
        ? <Link className="btn event_edit" to={`/eventEdit/${eventId}`}>
            Edit
          </Link>
        : ""
      }
  <div>Date:{event?.date}</div>
  <div>Description:{event?.description}</div>
  <div>
    <img src ={event.img}></img>
    </div>
</section>
}

