import { EmployeeViews } from "./EmployeeViews";
import { CustomerViews } from "./CustomerViews";

export const ApplicationViews = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  if (userObject.staff) {
    return <EmployeeViews />;
  } else {
    return <CustomerViews />;
  }
};
