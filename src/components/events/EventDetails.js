import { Link, useParams } from "react-router-dom";

export const EventDetails = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  const {eventId} = useParams()

  return (
    <>
      <div>
        <h2>Event Details Page</h2>
      </div>
      {
        userObject.staff
        ? <Link className="btn event_edit" to={`/eventEdit/${eventId}`}>
            Edit
          </Link>
        : ""
      }
    </>
  );
};