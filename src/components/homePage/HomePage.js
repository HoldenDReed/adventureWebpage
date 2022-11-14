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
      <section className="eventsContainer">
        <HomepageLink linkUrl={`./eventType/1`} linkText="Exhibits" linkBg={Exhibits}/>
        <HomepageLink linkUrl={`/eventType/2`} linkText="Activities" linkBg={Activities}/>
        <HomepageLink linkUrl={`/eventType/3`} linkText="Camps" linkBg={Camps}/>
        <HomepageLink linkUrl={`/eventType/4`} linkText="Planetarium" linkBg={Planet}/>
      </section>
  );
};
