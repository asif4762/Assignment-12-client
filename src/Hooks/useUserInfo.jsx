import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosCommon from "./useAxiosCommon";

const useUserInfo = () => {
    const axiosCommon = useAxiosCommon();
    const {user, logOut} = useContext(AuthContext);
    const {data: userInfo} = useQuery({
        queryKey: ['userInfo', user, logOut],
        queryFn: async () =>{
          const {data} = await axiosCommon.get(`user/${user?.email}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
          })
          return data;
        }
      })
    return userInfo
};

export default useUserInfo;