import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSeruce";

const useUserInfo = () => {
    const axiosSecure = useAxiosSecure();
    const {user, logOut} = useContext(AuthContext);
    const {data: userInfo} = useQuery({
        queryKey: ['userInfo', user, logOut],
        queryFn: async () =>{
          const {data} = await axiosSecure.get(`user/${user?.email}`)
          return data;
        }
      })
    return userInfo
};

export default useUserInfo;