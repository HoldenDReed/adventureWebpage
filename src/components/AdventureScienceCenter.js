  import { Route, Routes } from "react-router-dom";
  import { Authorized } from "./views/Authorized";
  import { ApplicationViews } from "./views/ApplicationViews";
  import { Login } from "./auth/Login";
  import { NavBar } from "./nav/NavBar";
  import { Register } from "./auth/Register";

  export const AdventureScienceCenter = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <NavBar />
                <ApplicationViews />
              </>
            </Authorized>
          }
        />
      </Routes>
    );
  };
