import { Outlet, Route, Routes } from "react-router-dom"
import { EventsList } from "../events/EventsList"
import { HomePage } from "../homePage/HomePage"
export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Adventure Science Center</h1>
                    <div>EXPLORE AND DISCOVER WITH US.</div>
                    
                    <Outlet />
                    
                </>
            }>
                <Route path="events" element={ <EventsList /> } />
                <Route path="homePage" element={ <HomePage /> } />
            </Route>
            
        </Routes>
    )
}