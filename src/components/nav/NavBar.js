import { useNavigate } from "react-router-dom";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  if (userObject.staff) {
    return <EmployeeNav />;
  } else {
    return <CustomerNav />;
  }
};
