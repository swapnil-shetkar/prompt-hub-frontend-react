import { Outlet, Navigate } from 'react-router-dom'
import { isAuthenticated } from "./index";

const AdminRoutes = () => {
    return(
        isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default AdminRoutes;
