import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EventEdit = () => {
    const navigate = useNavigate()
    const {eventId} = useParams()

    const [event, update] = useState({
        eventCategoriesId: 1,
        name: "",
        description: "",
        date: "",
        img: ""
    })

    useEffect(
        () => {
            const fetchEvent = async () => {
                const response = await fetch(`http://localhost:8088/events/${eventId}`)
                const eventObject = await response.json()
                update(eventObject)
            }
            fetchEvent()
        },
        []
    )

    const handleSaveButtonClick = () => {
        const eventToSendToAPI = {
            name: event.name,
            eventCategoriesId: event.eventCategoriesId,
            description: event.description,
            date: event.date,
            img: event.img
        }

        const sendEvent = async () => {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventToSendToAPI)
            }
            await fetch (`http://localhost:8088/events/${event.id}`, options)
            navigate(`/eventDetails/${event.id}`)
        }
        sendEvent()
    }

    return (
        <form>
            <h2>Edit Event Details</h2>
            <fieldset>
                <div className="form-group">
                    <label>Event Type:</label>
                    <select required autoFocus value={event.eventCategoriesId} onChange={
                        (evt) => {
                            const copy = { ...event }
                            copy.eventCategoriesId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="1">Exhibits</option>
                        <option value="2">Activites</option>
                        <option value="3">Camps</option>
                        <option value="4">Planetarium</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Event name:</label>
                    <input
                        required autoFocus
                        type="text"
                        placeholder="Event Name"
                        value={event.name}
                        onChange={(evt) => {
                            const copy = { ...event }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        placeholder="Description"
                        value={event.date}
                        onChange={
                            (evt) => {
                              const copy = { ...event }
                              copy.date = evt.target.value
                              update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Photo URL:</label>
                    <input
                        required autoFocus
                        type="url"
                        value={event.img}
                        name="url" id="url"
                        placeholder="https://example.com"
                        pattern="https://.*" 
                        size="30"
                        onChange={
                            (evt) => {
                              const copy = { ...event }
                              copy.img = evt.target.value
                              update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label for="descriptionBox">Enter description:</label>
                    <textarea
                        className="descriptionBox"
                        required autoFocus
                        type="text-area"
                        placeholder="Description"
                        value={event.description}
                        onChange={
                            (evt) => {
                              const copy = { ...event }
                              copy.description = evt.target.value
                              update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}