import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="home">
        <Link className="event__link" to={`/eventType/1`}>
          <div className="event__type">Exhibits</div>
        </Link>

        <div className="event__type">
          <Link className="event__link" to={`/eventType/2`}>
            Activites
          </Link>
        </div>
        <div className="event__type">
          <Link className="event__link" to={`/eventType/3`}>
            Camps
          </Link>
        </div>
        <div className="event__type">
          <Link className="event__link" to={`/eventType/4`}>
            Planetarium
          </Link>
        </div>
      </section>
    </>
  );
};
