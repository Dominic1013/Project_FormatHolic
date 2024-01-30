import React, { useState, useEffect } from "react";
import "./formatB.css";

// import icons
import { MdOutlineDataSaverOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";

import { RiFunctionLine } from "react-icons/ri";

//  import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

// import konvas & use-image Hook
import { Stage, Layer, Image, Circle, Line } from "react-konva";
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
  const [courtIamge] = useImage("/formatBMedia/pro_court.jpeg"); // court backgroundImage
  const [players, setPlayers] = useState([
    { x: 100, y: 100 },
    { x: 150, y: 150 },
  ]); // 初始球員位置
  // drawing lines state
  const [lines, setLines] = useState([]);
  // for players circle RWD
  const [circleRadius, setCircleRadius] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  // for prevStep & nextStep state
  const [restore, setRestore] = useState([]);

  // listen window size(for Stage RWD)
  const [canvasSize, setCanvasSize] = useState({ width: 873, height: 494 });
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 900) {
        // small than 900px, Pad mode
        setCanvasSize({ width: 700, height: 396 });
        setCircleRadius(20);
      }
      if (window.innerWidth < 800) {
        // small than 900px, Pad mode
        setCanvasSize({ width: 500, height: 283 });
        setCircleRadius(20);
      }

      if (window.innerWidth < 500) {
        setCanvasSize({ width: 300, height: 170 });
        setCircleRadius(10);
      }
      if (window.innerWidth > 900) {
        setCanvasSize({ width: 873, height: 494 });
        setCircleRadius(20);
      }
    };

    // 監聽window大小變化，若使用者調整window大小，監聽它
    window.addEventListener("resize", checkSize);

    // 第一次render時需要手動啟用此函數，因為window監聽一開始使用者不會調整。
    checkSize();
  }, []);

  // konva.js handleFn
  // handle drag move with player cicle
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

  // handle drawing with mouse
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    //獲取mouse在畫布stage上的當前位置，這是konva.js的方法，用於獲取舞台（stage）相對於畫布的座標位置。
    const position = e.target.getStage().getPointerPosition();
    // setLines([...lines, { points: [position.x, position.y], tool: "pen" }]);
    setLines([
      ...lines,
      { points: [position.x, position.y], tool: isEraser ? "eraser" : "pen" },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines(lines.concat());
    // bc we change the data didnt with setState,react didnt know the change,
    // create a copy to useState, let it know state is changed.
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  // fnCollection - eraser function
  const switchToEraser = () => {
    setIsEraser(true);
  };
  // fnCollection - pen function
  const switchToPen = () => {
    setIsEraser(false);
  };

  // fnCollection - prevStep
  const handlePrevStep = () => {
    let newLines = lines.slice(); // 淺拷貝
    if (newLines.length > 0) {
      setRestore([...restore, newLines[newLines.length - 1]]); // store the pop() element to restore state
      newLines.pop();
      setLines(newLines);
    }
  };
  // fnCollection - nextStep
  const handleNextStep = () => {
    if (restore.length < 1) {
      return;
    }
    let newLines = lines.slice(); // 淺拷貝
    if (newLines.length > 0) {
      setLines([...newLines, restore[restore.length - 1]]); // put the pop( element into lines state)
      let newRestore = restore.slice(); // 淺拷貝
      newRestore.pop();
      setRestore(newRestore);
    }
  };

  // handle fncollection showUp
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
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Layer split two layer, */}
          {/* Background Layer */}
          <Layer>
            <Image
              image={courtIamge}
              width={canvasSize.width}
              height={canvasSize.height}
            />
          </Layer>

          {/* Players Layer */}
          <Layer>
            {players.map((player, index) => (
              <Circle
                key={index}
                x={player.x}
                y={player.y}
                radius={circleRadius}
                fill="red"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={(e) => handleDragEnd(e, index)}
              />
            ))}
          </Layer>
          {/* Painting Layer */}
          <Layer>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke={line.tool === "eraser" ? "white" : "black"} // in eraser mode, this is unnecessary
                strokeWidth={line.tool === "eraser" ? 10 : 5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </section>

      {/* --------------------------------------------------- */}
      {/* toggle button(PC pad) */}
      <div className="toggleContainer flex" onClick={collectionClickHandler}>
        <RiFunctionLine className="icon" />
      </div>
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
        <div className="fnBox flex" title="Pen" onClick={switchToPen}>
          <div className="circle flex">
            <FaPencilAlt className="icon" alt="Pen" />
          </div>
          {/* <p className="fnText">Pen</p> */}
        </div>
        <div className="fnBox flex" title="Eraser" onClick={switchToEraser}>
          <div className="circle flex">
            <FaEraser className="icon" alt="Eraser" />
          </div>
          {/* <p className="fnText">Pen</p> */}
        </div>
        <div className="fnBox flex" title="Layer">
          <div className="circle flex">
            <MdOutlineDataSaverOn className="icon" alt="Save Layer" />
          </div>
          {/* <p className="fnText">Save Layer</p> */}
        </div>

        <div className="fnBox flex" title="Trash">
          <div className="circle flex">
            <FaTrash className="icon" alt="Trash Can" />
          </div>
          {/* <p className="fnText">Trash Can</p> */}
        </div>

        <div className="fnBox flex" title="New Person">
          <div className="circle flex">
            <FaPersonCirclePlus className="icon" alt="New Person" />
          </div>
          {/* <p className="fnText">New Person</p> */}
        </div>

        <div className="fnBox flex" title="Prev Step" onClick={handlePrevStep}>
          <div className="circle flex">
            <IoArrowUndoSharp className="icon" alt="Prev Step" />
          </div>
          {/* <p className="fnText">Prev Step</p> */}
        </div>

        <div className="fnBox flex" title="Next Step" onClick={handleNextStep}>
          <div className="circle flex">
            <IoArrowRedo className="icon" alt="Next Step" />
          </div>
          {/* <p className="fnText">Next Step</p> */}
        </div>

        <div className="fnBox flex" title="Setting">
          <div className="circle flex">
            <IoMdSettings className="icon" alt="Setting" />
          </div>
          {/* <p className="fnText">Settings</p> */}
        </div>
      </div>
    </section>
  );
};

export default FormatB;
