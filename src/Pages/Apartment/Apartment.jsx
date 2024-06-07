import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
const Apartment = () => {
    const axiosCommon = useAxiosCommon();
    const {id} = useParams();
    const {data} = useQuery({
        queryKey: ['apartment'],
        queryFn: async () =>{
            const res = await axiosCommon.get(`/apartments/${id}`)
            return res.data;
        }
    })
    console.log(data);
    return (
        <div>
            <img src={data?.apartment_image} alt="" />
        </div>
    );
};

export default Apartment;