import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Styles.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Slider = () => {
  const axiosCommon = useAxiosCommon();
  const {data} = useQuery({
    queryKey: ['apartment'],
    queryFn: async () =>{
      const res = await axiosCommon.get('/apartments')
      return res.data;
    }
  })
  console.log(data);

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
