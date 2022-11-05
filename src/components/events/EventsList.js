import { useEffect } from "react"
import { useState } from "react"
import { Event } from "./Event"

export const EventsList = () => {
    const [events, setEvents] = useState([])

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/events?eventCategoriesId=1`)
                const eventsArray = await response.json()
                setEvents(eventsArray)
            }
            fetchData()
        },
        []
    )

    return <>
        <artical className="events">
            {
                events.map(event => <Event key={`event--${event.id}`}
                    id={event.id}
                    name={event.name}
                    description={event.description}
                    date={event.date}
                    img={event.img} />)
            }
        </artical>
    </>
}