import { Outlet, Navigate } from 'react-router-dom'
import { isAuthenticated } from "./index";

const PrivateRoutes = () => {
    let auth = isAuthenticated()
    return(
        auth ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes;
