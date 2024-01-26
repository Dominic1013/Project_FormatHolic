import React, { useState } from "react";
import "./formatB.css";

// import icons
import { MdOutlineDataSaverOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

import { RiFunctionLine } from "react-icons/ri";

//  import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

// just for test swiper.js
const testData = [
  {
    id: 1,
    image: "./settingMedia/ground_initFormat.jpg",
  },
  {
    id: 2,
    image: "./settingMedia/ground_initFormat2.jpg",
  },
  {
    id: 3,
    image: "./settingMedia/ground_initFormat.jpg",
  },
  {
    id: 4,
    image: "./settingMedia/ground_initFormat.jpg",
  },
];

const FormatB = () => {
  // fncollection clcik event useState
  const [collectionActive, setCollectionActive] = useState(
    "fnCollection grid container"
  );

  // handle fncollection click
  const collectionClickHandler = () => {
    if (collectionActive === "fnCollection grid container") {
      setCollectionActive("fnCollection grid container active");
    } else {
      setCollectionActive("fnCollection grid container");
    }
  };

  return (
    <section className="formatB">
      <div className="canvasContainer">
        {/* 之後可確認寬高是否要放在元素上面寫，不曉得會不會有bug。 */}
        <canvas id="myCanvas"></canvas>
        <img src="./formatBMedia/court.png" alt="court" />
      </div>

      {/* swiper.js */}
      {/* --------------------------------------------------- */}
      <div className="swiperDiv">
        <Swiper
          // install Swiper modules
          modules={[Navigation, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {testData.map((data) => {
            return (
              <SwiperSlide>
                <img src={data.image} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* --------------------------------------------------- */}

      <div className={collectionActive}>
        <div className="fnBox flex">
          <div className="circle flex">
            <MdOutlineDataSaverOn className="icon" />
          </div>
          <p className="fnText">Save Layer</p>
        </div>

        <div className="fnBox flex">
          <div className="circle flex">
            <FaTrash className="icon" />
          </div>
          <p className="fnText">Trash Can</p>
        </div>

        <div className="fnBox flex">
          <div className="circle flex">
            <FaPersonCirclePlus className="icon" />
          </div>
          <p className="fnText">New Person</p>
        </div>

        <div className="fnBox flex">
          <div className="circle flex">
            <IoArrowUndoSharp className="icon" />
          </div>
          <p className="fnText">Prev Step</p>
        </div>

        <div className="fnBox flex">
          <div className="circle flex">
            <IoArrowRedo className="icon" />
          </div>
          <p className="fnText">Next Step</p>
        </div>

        <div className="fnBox flex">
          <div className="circle flex">
            <IoMdSettings className="icon" />
          </div>
          <p className="fnText">Settings</p>
        </div>
      </div>

      <div className="toggleContainer flex" onClick={collectionClickHandler}>
        <RiFunctionLine className="icon" />
      </div>
    </section>
  );
};

export default FormatB;

{
  /* <canvas
id="myCanvas"
width="320"
height="320"
style="background-color: black"
>
</canvas> */
}
