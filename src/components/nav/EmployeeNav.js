import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const EmployeeNav = () => {
  const navigate = useNavigate();
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/add/event">
          Add Event
        </Link>
      </li>
      {localStorage.getItem("project_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("project_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
