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

// import konvas & use-image Hook
import { Stage, Layer, Image, Circle } from "react-konva";
import useImage from "use-image";

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
  // Konva.js State
  const [courtIamge] = useImage("formatBMedia/pro_court.jpeg"); // court bc
  const [players, setPlayers] = useState([
    { x: 100, y: 100 },
    { x: 150, y: 150 },
  ]); // 初始球員位置

  // konva.js handleFn
  const handleDragStart = (e, index) => {
    const newPlayers = players.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = { ...players[index], isDragging: true }; // 更新dragging資料
    setPlayers(newPlayers);
  };
  const handleDragEnd = (e, index) => {
    const newPlayers = players.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = { x: e.target.x(), y: e.target.y(), isDragging: false }; // 更新dragging資料
    setPlayers(newPlayers);
  };

  // handle fncollection click
  const collectionClickHandler = () => {
    if (collectionActive === "fnCollection grid container") {
      setCollectionActive("fnCollection grid container active");
    } else {
      setCollectionActive("fnCollection grid container");
    }
  };

  return (
    <section className="formatB flex">
      {/* Konva.js */}
      <section>
        <Stage width={873} height={494}>
          <Layer>
            <Image image={courtIamge} width={873} height={494} />
            {players.map((player, index) => (
              <Circle
                key={index}
                x={player.x}
                y={player.y}
                radius={20}
                fill="red"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={(e) => handleDragEnd(e, index)}
              />
            ))}
          </Layer>
        </Stage>
      </section>
      {/* --------------------------------------------------- */}
      {/* swiper.js */}
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
          {testData.map((data, index) => {
            return (
              <SwiperSlide key={index}>
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
