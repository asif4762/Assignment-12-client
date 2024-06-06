import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import img1 from '../../../public/images/interior-small-apartment-living-room-600nw-2154108011.webp'
import "./Styles.css";

const Slider = () => {
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
        <SwiperSlide>
          <img 
            src="https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
        <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
</SwiperSlide>
        <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGltYWdlfGVufDB8fDB8fHww" alt="" />
</SwiperSlide>
        <SwiperSlide>
        <img src="https://images.unsplash.com/photo-1598214886806-c87b84b7078b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGltYWdlfGVufDB8fDB8fHww" alt="" />
</SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Slider;