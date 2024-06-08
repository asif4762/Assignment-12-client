import { Helmet } from "react-helmet-async";
import Slider from "../../Components/Slider/Slider";
import Typography from "../../Components/Typography/Typography";
import Coupons from "../../Components/Cupons/Cupons";
import ApartmentMap from "../../Components/ApartmentMap/ApartmentMap";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RentRase | Home</title>
      </Helmet>
      <Slider />
      <div className="mt-20">
        <div className="w-1/3 mx-auto text-blue-900 mb-10">
          <h1 className="text-center font-bold text-3xl border-y-4 border-green-700 py-10">
            About The Building
            <p className="text-lg mt-2">Frequently Asked Questions</p>
          </h1>
        </div>
      </div>
      {/* typography */}
      <Typography />
      {/* Coupon */}
      <Coupons  />
      {/* Map */}
      <h1 className="text-center w-1/3 mx-auto font-bold text-3xl border-y-4 text-blue-900 border-green-700 py-10 mb-10">
        Location Of Out Apartment
      </h1>
      <div className="bg-green-50 rounded-lg p-6 mt-10">
        <h1 className="mb-10 text-xl">
          <span className="text-3xl font-bold">Location Details:</span>
          <br />
          📍 Address: 63 No Cresent Road, Bashundhara, Dhaka, 1205
          <br />
          🚗 Parking: Limited parking available on-site. Additional parking can
          be found nearby.
          <br />
          🚇 Public Transport: The apartment is within walking distance of the
          Cityville Metro Station.
        </h1>
      </div>

      <div className="text-xl mb-10 bg-green-50 p-6 rounded-lg mt-10">
        <h1>
          <span className="font-bold text-3xl mb-4">Directions:</span>
          <br />
          <span className="text-2xl font-bold">By Car:</span>
          <br />
          If you're coming by car, simply use your preferred navigation app and
          enter our address: 63 No creset Road Main Street. You'll reach us in
          no time!
          <br />
          <span className="text-2xl font-bold">By Public Transport:</span>
          <br />
          If you're taking public transport, head to the nearest Dhaka Metro
          Station. From there, walk south on Main Street for about 5 minutes
          until you reach our building.
          <br />
          <span className="font-bold text-2xl">By Foot:</span>
          <br />
          If you're already in the area, finding us on foot is easy. Just head
          to Main Street and look for our building at number 64 No.
        </h1>
      </div>
      <div>
        <h1 className="text-center text-blue-900 w-1/3 mx-auto font-bold text-3xl border-y-4 border-green-700 py-10 mb-10">Live Map Of Our Apartment</h1>
      </div>
      <ApartmentMap />
    </div>
  );
};

export default Home;
