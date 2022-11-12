import { Outlet, Route, Routes } from "react-router-dom";
import { EventForm } from "../events/EventForm";
import { EventDetails } from "../events/EventDetails";
import { EventsList } from "../events/EventsList";
import { HomePage } from "../homePage/HomePage";

export const EmployeeViews = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Adventure Science Center</h1>
            <div>EXPLORE AND DISCOVER WITH US.</div>
            <h2>Welcome, {userObject.fullName}</h2>

            <Outlet />
          </>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/eventType/:eventTypeId" element={<EventsList />} />
        <Route path="/eventDetails/:eventId" element={<EventDetails />} />
        <Route path="add/event" element={<EventForm />} />
        <Route path="events" element={<EventsList />} />
      </Route>
    </Routes>
  );
};
