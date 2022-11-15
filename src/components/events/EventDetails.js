import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Comment } from "../comments/Comment";


export const EventDetails = () => {

  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);
  

  const [event, setEvent] = useState({})
  const [comments, updateComments] = useState([])
  const [users, setUsers] = useState([])
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
      fetch(`http://localhost:8088/comments?_embed=likedComments&_expand=user&eventId=${eventId}`)
        .then (response => response.json())
        .then ((response) => {
        const commentArray = response
            updateComments(commentArray)
          
        })
    },
    [eventId]
  )

  useEffect(
    () => {
      fetch(`http://localhost:8088/users`)
        .then (response => response.json())
        .then ((response) => {
        const usersArray = response
            setUsers(usersArray)
          
        })
    },
    []
  )

  const [newComment, update] = useState({
    datePosted: "",
    comment: "",
    eventId: `${eventId}`
  });
  
  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    const formattedDateStamp = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const formattedTimeStamp = new Date().toLocaleTimeString("en-US");
    const formattedDateTimeStamp = formattedDateStamp + " " + formattedTimeStamp

    const commentToSendToAPI = {
      userId: userObject.id,
      eventId: parseInt(newComment.eventId),
      datePosted: formattedDateTimeStamp,
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
        window.location.reload(false);
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

<div className="commentHeader">Comment section</div>
    <form>
    <div>
      
          <label htmlFor="descriptionBox">Comment:</label>
          <div className="commentDescription">
          <textarea
            className="commentDescriptionBox"
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
      </div>
      </form>

    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit New Comment
      </button>

    <footer className="comments">
      <div>
        {comments.map((comment) => (
          <div key={`comment--${comment.id}`} className="comment">
            <div>{comment.datePosted}</div>
            <div>{comment.user.fullName}</div>
            <div>{comment.comment}</div>
            {
              userObject.id === comment.userId
              ? <button
                onClick={() => 
                  {
                    const deleteComment = async () => {
                    await fetch(`http://localhost:8088/comments/${comment.id}`, {method: "DELETE"})
                    window.location.reload(false)
                  }
                    deleteComment()
                  }
                }
                className="btn btn-primary"
              >Delete</button>
              : ""
            }
          </div>
        ))}
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
            <Comment
              key={`comment--${comment.id}`}
              id={comment.id}
              datePosted={comment.datePosted}
              userFullName={comment.user.fullName}
              comment={comment.comment}
              userId={comment.userId}
            />
          ))}
        </div>
      </footer>
  </section>
}

