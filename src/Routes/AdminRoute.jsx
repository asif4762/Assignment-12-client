import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";
import useUserInfo from "../Hooks/useUserInfo";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()

    if(isLoading) return <LoadingSpinner/>

    console.log(role)

    if(role === 'admin') return children
    return <Navigate to='/dashboard'/>
};

export default AdminRoute;