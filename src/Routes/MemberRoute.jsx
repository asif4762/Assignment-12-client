import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router-dom";


const MemberRoute = ({children}) => {
    const [role, isLoading] = useRole()

    console.log(role)
    if(isLoading) return <LoadingSpinner/>
    if(role === 'member') return children
    return <Navigate to='/dashboard'/>
};

export default MemberRoute;