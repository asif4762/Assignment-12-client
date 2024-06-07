import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider/Slider";
import Cards from "../../Components/Cards/Cards";


const Home = () => {
  return (
    <div>
    <Helmet>
      <title>
        RentRase | Home
      </title>
    </Helmet>
      <Slider/>
    <div className="mt-10">
    <Cards/>
    </div>
    </div>
  );
};

export default Home;
