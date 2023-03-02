import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import StockSliderCards from "./StockSliderCards";

const StocksCarousel = ({ stocks }) => {
  return (
    <div className=" w-full h-full">
      <Swiper
        style={{
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {stocks.map((stock) => (
          <SwiperSlide
            className=" bg-[linear-gradient(114.3deg,rgb(19,126,57)_0.2%,rgb(8,65,91)_68.5%)] rounded-[1rem] overflow-hidden"
            key={stock.symbol}
          >
            <StockSliderCards stockData={stock} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StocksCarousel;
