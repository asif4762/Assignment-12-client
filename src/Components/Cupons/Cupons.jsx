import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import CouponCard from "./CouponCard";

const Coupons = () => {
    const axiosCommon = useAxiosCommon();
    const {data: coupons} = useQuery({
        queryKey: ['coupons'],
        queryFn: async () =>{
            const res = await axiosCommon.get('/coupons')
            return res.data;
        }
    })

    console.log(coupons)

    return (
        <section className="bg-transparent py-10 mt-10 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-center border-y-4 py-10 w-1/3 mx-auto border-green-700 text-blue-900">Exclusive Coupons</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {coupons?.map((coupon, index) => (
                        <CouponCard key={index} coupon={coupon} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Coupons;
