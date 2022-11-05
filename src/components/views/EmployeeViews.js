import { Outlet, Route, Routes } from "react-router-dom"
import { EventsList } from "../events/EventsList"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Adventure Science Center</h1>
                    <div>EXPLORE AND DISCOVER WITH US.</div>
                    
                    <Outlet />
                </>
            }>
                <Route path="events" element={ <EventsList/> } />
                
            </Route>
            
        </Routes>
    )
}