
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const EventDetails = () => {

  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);
  
const [event, setEvent] = useState({})
const [comments, updateComments] = useState([])
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
  
  useEffect(
    () => {
   fetch(`http://localhost:8088/comments?_expand=user&eventId=${eventId}`)
       .then (response => response.json())
       .then ((response) => {
        const commentArray = response
           updateComments(commentArray)
          
       })
    },
    [eventId]
  )

    const [newComment, update] = useState({
      datePosted: "10-10-2022",
      comment: "",
      eventId: `${eventId}`
    });
  
    const navigate = useNavigate();
  
    const handleSaveButtonClick = (event) => {
      event.preventDefault();
  
      const commentToSendToAPI = {
        userId: userObject.id,
        eventId: parseInt(newComment.eventId),
        datePosted: newComment.datePosted,
        comment: newComment.comment,
      };
  
      return fetch(`http://localhost:8088/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentToSendToAPI),
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/eventDetails/${eventId}`);
        });
    };

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

<h4>Comment section</h4>
    <form>
    <fieldset>
        <div className="form-group">
          <label htmlFor="descriptionBox">Comment:</label>
          <textarea
            className="descriptionBox"
            required
            autoFocus
            type="text-area"
            placeholder="Comment"
            value={newComment.comment}
            onChange={(evt) => {
              const copy = { ...newComment };
              copy.comment = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      </form>

    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit New Comment
      </button>

    <footer className="comment">
      <div>
        {comments.map((comment) => (
          <div>
            <div>{comment.datePosted}</div>
            <div>{comment.user.fullName}</div>
            <div>{comment.comment}</div>
          </div>
        ))}
      </div>
    </footer>
</section>

}

