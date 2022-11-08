import { Outlet, Route, Routes } from "react-router-dom";
import { EventDetails } from "../events/EventDetails";
import { EventsList } from "../events/EventsList";
import { Favorites } from "../favorites/Favorites";
import { HomePage } from "../homePage/HomePage";
import { ImageUploader } from "../utilities/ImageUploader";
export const CustomerViews = () => {
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
        <Route path="favorites" element={<Favorites />} />
        <Route path="events" element={<EventsList />} />
        <Route path="homePage" element={<HomePage />} />
        <Route path="imageUpload" element={<ImageUploader />} />
      </Route>
    </Routes>
  );
};
