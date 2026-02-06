import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({allowedRoles}) => {
    const {auth} = useAuth()
    const location = useLocation();

    if(!auth?.token){
        if(location.pathname.startsWith("/admin")){
            return <Navigate to="/login" replace />
        } else if(location.pathname.startsWith("/user")){
            return <Navigate to="/signin" replace />
        }
        return <Navigate to="/signin" replace />
    }

    if(allowedRoles && (!allowedRoles.includes(auth.usertype))){
        return <Navigate to="/login" replace />
    }
    
    return <Outlet />
}

export default ProtectedRoute;