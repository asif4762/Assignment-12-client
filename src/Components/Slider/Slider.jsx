import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Styles.css";
import useApartments from "../../Hooks/useApartments";

const Slider = () => {
  const [data] = useApartments();

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          data?.map((item) => <SwiperSlide key={item._id}>
          <img src={item.apartment_image} alt="" />
        </SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Slider;
