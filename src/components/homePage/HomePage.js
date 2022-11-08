import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div>
          <Link to={`/eventType/1`}>Exhibits</Link>
        </div>
        <div>
          <Link to={`/eventType/2`}>Activites</Link>
        </div>
        <div>
          <Link to={`/eventType/3`}>Camps</Link>
        </div>
        <div>
          <Link to={`/eventType/4`}>Planetarium</Link>
        </div>
      </section>
    </>
  );
};
