import useUserInfo from "../Hooks/useUserInfo";
import { Navigate } from "react-router-dom";


const MemberRoute = ({children}) => {
    const userInfo = useUserInfo();

    console.log(userInfo?.role)

    if(userInfo?.role === 'member') return children
    return <Navigate to='/dashboard'/>
};

export default MemberRoute;