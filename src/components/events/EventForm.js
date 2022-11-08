import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const EventForm = () => {

    const [newEvent, update] = useState({
      eventCategoriesId: 1,
      name: "",
      description: "",
      date: "",
      img: ""
    });

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const eventToSendToAPI = {
            name: newEvent.name,
            eventCategoriesId: newEvent.eventCategoriesId,
            description: newEvent.description,
            date: newEvent.date,
            img: newEvent.img
        }

        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/eventType/${newEvent.eventCategoriesId}`)
            })
    }

    return (
        <form>
            <h2>New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label>Enter event Type:</label>
                    <select required autoFocus value={newEvent.eventCategoriesId} onChange={
                        (evt) => {
                            const copy = { ...newEvent }
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
                    <label>Enter event name:</label>
                    <input
                        required autoFocus
                        type="text"
                        placeholder="Event Name"
                        value={newEvent.name}
                        onChange={(evt) => {
                            const copy = { ...newEvent }
                            copy.name = evt.target.value
                            update(copy)
                        }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label>Enter date:</label>
                    <input
                        required autoFocus
                        type="date"
                        placeholder="Description"
                        value={newEvent.date}
                        onChange={
                            (evt) => {
                              const copy = { ...newEvent }
                              copy.date = evt.target.value
                              update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Enter photo URL:</label>
                    <input
                        required autoFocus
                        type="url"
                        value={newEvent.img}
                        name="url" id="url"
                        placeholder="https://example.com"
                        pattern="https://.*" 
                        size="30"
                        onChange={
                            (evt) => {
                              const copy = { ...newEvent }
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
                        value={newEvent.description}
                        onChange={
                            (evt) => {
                              const copy = { ...newEvent }
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
                Submit New Event
            </button>
        </form>
    )
}