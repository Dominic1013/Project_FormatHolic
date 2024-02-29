import React from "react";
import "./storageModal.scss";
//  import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { AiFillCloseCircle } from "react-icons/ai";

const StorageModal = ({ data, closeFn }) => {
  return (
    <div className="modalWrapper">
      <div className="modalOverlay"></div>
      <div className="modalContainer">
        <div className="close" onClick={closeFn}>
          <AiFillCloseCircle className="icon" />
        </div>
        {/* <h2>{data.teamname}</h2> */}
        <h2>Team name</h2>
        {/* <p>{data.updateDay} days updated</p> */}
        <p>1 days updated</p>
        <div className="swiperDiv">
          <Swiper
            // install Swiper modules
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
          >
            {data?.formatImageUrl.map((img) => (
              <SwiperSlide key={img.id}>
                <div>
                  <img className="cldImage" src={img.image_path} alt="img" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default StorageModal;
