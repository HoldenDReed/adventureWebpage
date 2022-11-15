import { useEffect } from "react";
import { useState } from "react";
import { Event } from "./Event";
import { useParams } from "react-router-dom";
import "./Events.css"
export const EventsList = () => {
  const [events, setEvents] = useState([]);
  const {eventTypeId} = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/events?_expand=eventCategories&eventCategoriesId=${eventTypeId}`
      );
      const eventsArray = await response.json();
      setEvents(eventsArray);
    };
    fetchData();
  }, []);

  return (
    <>
        <h2>{events[0]?.eventCategories?.type}</h2>
        <article className="events">
        {events.map((event) => (
          <Event
            key={`event--${event.id}`}
            id={event.id}
            name={event.name}
            description={event.description}
            date={event.date}
            img={event.img}
          />
        ))}
      </article>
    </>
  );
};
