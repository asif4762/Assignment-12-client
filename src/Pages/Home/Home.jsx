import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider/Slider";
import Cards from "../../Components/Cards/Cards";
import Typography from "../../Components/Typography/Typography";
import Coupons from "../../Components/Cupons/Cupons";


const Home = () => {
  return (
    <div>
    <Helmet>
      <title>
        RentRase | Home
      </title>
    </Helmet>
      <Slider/>
    <div className="mt-20">
    <div className="w-1/3 mx-auto text-blue-900 mb-10">
    <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">About The Building
    <p className="text-lg mt-2">Frequently Asked Questions</p>
    </h1>
    </div>
    </div>
    {/* typography */}
    <Typography/>
    {/* Coupon */}
    <Coupons/>
    </div>
  );
};

export default Home;
