import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"
import Activities from "./img/Activities.jpg"
import Camps from "./img/Camps.jpg"
import Planet from "./img/Planet.jpg"
import Exhibits from "./img/Exhibits.jpg"



const HomepageLink = ({linkUrl, linkText, linkBg}) => {
  return(
     <Link to={linkUrl} className="eventsContainer-link">
        <span className="link-text">{linkText}</span><span className="link-background" style={{backgroundImage: `url(${linkBg})`}}/>
     </Link>
  )
}

export const HomePage= () => {

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
  );
};
