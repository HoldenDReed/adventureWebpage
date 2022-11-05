import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const HomePage = () => {
    const navigate = useNavigate()
    return (<>
    <section>
    <div>
        <Link to={() => navigate("/EventsList/1")}>Exhibits</Link>
    </div>
    <div>
    <Link to={() => navigate("/EventsList/2")}>Activites</Link>
    </div>
    <div>
    <Link to={() => navigate("/EventsList/3")}>Camps</Link>
    </div>
    <div>
    <Link to={() => navigate("/EventsList/4")}>Planetarium</Link>
    </div>
    </section>
    </>)
}