import useUserInfo from "../Hooks/useUserInfo";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const userInfo = useUserInfo();

    console.log(userInfo?.role)

    if(userInfo?.role === 'admin') return children
    return <Navigate to='/dashboard'/>
};

export default AdminRoute;