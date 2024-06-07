import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";


const useApartments = () => {
    const axiosCommon = useAxiosCommon();

    const {data} = useQuery({
        queryKey: ['apartments'],
        queryFn: async () =>{
            const res = await axiosCommon.get('/apartments')
            return res.data;
        }
    })

    return [data]
};

export default useApartments;