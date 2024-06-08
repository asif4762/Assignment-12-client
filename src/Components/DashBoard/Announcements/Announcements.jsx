import { useQuery } from "@tanstack/react-query";
import AnnouncementCard from "./AnouncementCard";
import useAxiosSecure from "../../../Hooks/useAxiosSeruce";


const Announcements = () => {

    const axiosSecure = useAxiosSecure();

    const {data} = useQuery({
        queryKey: ['announcements'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/announcements')
            return res.data;
        }
    })

    console.log(data);

    return (
        <div className="lg:-ml-60">
            <div className=" lg:w-1/2 mx-auto text-blue-900 mb-10">
          <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">
            Anouncements
          </h1>
        </div>
            {
                data?.map((item, index) => <AnnouncementCard key={index} item={item}/>)
            }
        </div>
    );
};

export default Announcements;