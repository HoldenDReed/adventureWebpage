import { Outlet, Route, Routes } from "react-router-dom";
import { EventDetails } from "../events/EventDetails";
import { EventsList } from "../events/EventsList";
import { Favorites } from "../favorites/Favorites";
import { HomePage } from "../homePage/HomePage";
import { ImageUploader } from "../utilities/ImageUploader";
import "../views/CustomerViews.css"

export const CustomerViews = () => {
  const localUser = localStorage.getItem("project_user");
  const userObject = JSON.parse(localUser);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
          <div className="text">
            <h1>Adventure Science Center</h1>
            <div className="title">For over 75 years, Adventure Science Center has been bringing science to life for students, teachers, and families in Middle Tennessee and across the U.S. The science center offers engaging learning experiences and science fun through hands-on, interactive exhibits, innovative programs, and full-dome productions in the state-of-the-art Sudekum Planetarium.

Over the next three years, more than 15,000 square feet of exhibit space at Adventure Science Center will evolve into more exciting experiences. From an interactive climbing structure to an immersive exploration of infinity, the science center has something for everyone.

Adventure Science Center strives to open every mind to the wonders of science and technology, fostering a better understanding of ourselves and the world around us. Each year, the science center provides reduced or free admission to more than 20,000 guests and remains free for teachers and MNPS students.

Join us for an adventure today!</div>
          </div>
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
