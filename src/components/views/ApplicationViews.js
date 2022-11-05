import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    const localProjectUser = localStorage.getItem("project_user")
    const projectUserObject = JSON.parse(localProjectUser)
  
    if(projectUserObject.staff){
      return <EmployeeViews/>
    } else {
      return <CustomerViews/>
    }
  }