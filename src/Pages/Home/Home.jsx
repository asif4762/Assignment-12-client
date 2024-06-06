import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider/Slider";


const Home = () => {
  return (
    <div>
    <Helmet>
      <title>
        RentRase | Home
      </title>
    </Helmet>
      <Slider/>
    </div>
  );
};

export default Home;
