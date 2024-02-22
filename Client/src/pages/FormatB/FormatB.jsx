import React, { useState, useEffect, useRef } from "react";
import "./formatB.scss";

// import icons
import { MdOutlineDataSaverOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { FaComputerMouse } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { RiFunctionLine } from "react-icons/ri";

//  import swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

// import konvas & use-image Hook
import { Stage, Layer, Image, Circle, Line, Text, Group } from "react-konva";
import useImage from "use-image";

// import immer for immutable
import { produce } from "immer";

// // Context for settingInfo pass
import { useSetting } from "../../SettingInfoContext";

// just for test swiper.js
const testData = [
  {
    id: 1,
    image: "/settingMedia/ground_initFormat.jpg",
  },
  {
    id: 2,
    image: "/settingMedia/ground_initFormat2.jpg",
  },
  {
    id: 3,
    image: "/settingMedia/ground_initFormat.jpg",
  },
  {
    id: 4,
    image: "/settingMedia/ground_initFormat.jpg",
  },
];

const FormatB = () => {
  // state from BasketballSetting.jsx
  const { settingInfo, setSettingInfo } = useSetting();

  // fncollection clcik event useState
  const [collectionActive, setCollectionActive] = useState(
    "fnCollection grid container"
  );
  // Konva.js State
  const [courtIamge] = useImage("/formatBMedia/pro_court.jpeg"); // court backgroundImage
  const [courtIamge_half] = useImage("/formatBMedia/pro_court_half.jpeg"); // court half backgroundImage

  // drawing lines state
  const [lines, setLines] = useState([]);
  // for players circle RWD
  const [circleRadius, setCircleRadius] = useState(20);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [isMouse, setIsMouse] = useState(true);

  // for prevStep & nextStep state
  const [restore, setRestore] = useState([]);

  // listen window size(for Stage RWD)
  const [canvasSize, setCanvasSize] = useState({ width: 873, height: 494 });

  // ----------------------------------------------- for circle init
  //for circle X
  const playersX = () => {
    if (settingInfo.initFormat === "side") {
      return 100;
    } else {
      return 450;
    }
  };
  // for circle y
  const checkIsWindowSm = () => window.innerWidth < 500;
  const [isWindowSm, setIsWindowSm] = useState(checkIsWindowSm());

  const playersY = (i) => {
    return isWindowSm ? 20 * (i + 1) : 40 * (i + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWindowSm(checkIsWindowSm());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 初始球員數量及位置
  const [players, setPlayers] = useState(
    Array.from({ length: Number(settingInfo.memberNumber) }, (player, i) => ({
      x: playersX(),
      y: playersY(i) || 20,
      name: settingInfo.memberInfo[i]?.name || "",
      color: settingInfo.memberInfo[i]?.color || "#D25656",
      isDragging: false,
    }))
  );

  // ------------------------------------------------新增球員按鈕
  const [personWarning, setPersonWarning] = useState(false);
  const [personNullWarning, setPersonNullWarning] = useState(false);
  const [personValue, setPersonValue] = useState(""); // input裡轉換成只能是1-10的數字
  const [realPersonValue, setRealPersonValue] = useState(""); // input裡真實撰寫的數字（可能超過10或小於1）
  // console.log(personValue);
  const [addPlayers, setAddPlayers] = useState([]);

  useEffect(() => {
    const newAddPlayers = Array.from(
      { length: Number(personValue) },
      (Addplayer, i) => ({
        x: 50,
        y: 50,
        // name: settingInfo.memberInfo[i]?.name || "",
        // color: settingInfo.memberInfo[i]?.color || "#D25656",
        isDragging: false,
      })
    );
    setAddPlayers(newAddPlayers);
  }, [personValue]);
  // console.log(personValue);

  const dialog = React.useRef(null);
  const handleOpenDialog = () => {
    dialog.current.showModal();
  };

  const handleCloseDialog = () => {
    dialog.current.close();
  };

  //新增球員
  const handleAddPlayerChange = (e) => {
    if (e.target.id === "person") {
      // console.log(e.target.id);
      const val = e.target.value;
      if (val === "") {
        setPersonValue(val);
        setRealPersonValue(val);

        return;
      }

      // 檢查person input是否為數字
      const num = Number(val);
      if (!isNaN(num) && num >= 1 && num <= 10) {
        setPersonValue(val);
        setRealPersonValue(val);

        setPersonWarning(false);
      } else if (!isNaN(num) && (num < 1 || num > 10)) {
        //如果數字不在1-10之間，不更新value，但不阻止使用者刪除數字
        //出現Warning Text
        setRealPersonValue(val);
        setPersonWarning(true);
        return;
      }

      // 更新state
      setPersonValue(val);
      setRealPersonValue(val);
    }
  };

  const handleSend = () => {
    if (realPersonValue && 10 >= Number(realPersonValue) >= 1) {
      // console.log("Success");
      dialog.current.close();
      return;
    }
    if (
      (realPersonValue && Number(realPersonValue) < 1) ||
      Number(realPersonValue) > 10
    ) {
      console.log("Out");
      setPersonWarning(true);
      setPersonNullWarning(false);
      return;
    }
    if (!realPersonValue) {
      console.log("Null");
      setPersonWarning(false);
      setPersonNullWarning(true);
      return;
    }
  };

  // ------------------------------------------------

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
        setIsWindowSm(true);
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

  // ----------------------------Drag event
  // konva.js handleFn
  // handle drag move with player cicle

  //預設球員的位置更新
  const handleDragStart = (e, index) => {
    const newPlayers = players.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = { ...players[index], isDragging: true }; // 更新dragging資料
    setPlayers(newPlayers);
  };

  const handleDragEnd = (e, index) => {
    const newPlayers = players.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = {
      ...players[index],
      x: e.target.x(),
      y: e.target.y(),
      isDragging: false,
    }; // 更新dragging資料
    setPlayers(newPlayers);
  };

  // 新增球員的位置更新
  const handleAddPlayersDragStart = (e, index) => {
    const newPlayers = addPlayers.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = { ...addPlayers[index], isDragging: true }; // 更新dragging資料
    setAddPlayers(newPlayers);
  };

  const handleAddPlayerDragEnd = (e, index) => {
    const newPlayers = addPlayers.slice(); // 淺拷貝，為了不直接修改原始的 players 狀態，這是React中處理狀態的最佳實踐
    newPlayers[index] = {
      ...addPlayers[index],
      x: e.target.x(),
      y: e.target.y(),
      isDragging: false,
    }; // 更新dragging資料
    setAddPlayers(newPlayers);
  };
  // ------------------------------

  // ------------------------------Painting Event

  // handle drawing with mouse
  const handleMouseDown = (e) => {
    if (isMouse) {
      return;
    } else {
      setIsDrawing(true);
      //獲取mouse在畫布stage上的當前位置，這是konva.js的方法，用於獲取舞台（stage）相對於畫布的座標位置。
      const position = e.target.getStage().getPointerPosition();

      setLines([
        ...lines,
        { points: [position.x, position.y], tool: isEraser ? "eraser" : "pen" },
        // {
        //   points: [position.x, position.y],
        //   tool: isEraser ? "eraser" : isPen ? "pen" : "",
        // },
      ]);
    }
  };

  // const handleMouseMove = (e) => {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);

  //   setLines(lines.concat());
  //   // bc we change the data didnt with setState,react didnt know the change,
  //   // create a copy to useState, let it know state is changed.
  // };

  const handleMouseMove = (e) => {
    if (!isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((currentLines) => {
      return produce(currentLines, (draftLines) => {
        let lastLine = draftLines[draftLines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        // lastLine.points.push(point.x, point.y); //也可以使用mutable method
      });
    });
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  // ------------------------------

  // ------------------------------Pen & Eraser

  const handleDeleteLine = () => {
    setLines([]);
  };

  // fnCollection - eraser function
  const switchToEraser = () => {
    setIsEraser(true);
    setIsMouse(false);
  };
  // fnCollection - pen function
  const switchToPen = () => {
    setIsEraser(false);
    setIsMouse(false);
  };

  const switchToMouse = () => {
    setIsMouse(true);
  };

  // ------------------------------

  // ------------------------------PrevStep & NextStep

  // fnCollection - prevStep
  // const handlePrevStep = () => {
  //   let newLines = lines.slice(); // 淺拷貝
  //   if (newLines.length > 0) {
  //     setRestore([...restore, newLines[newLines.length - 1]]); // store the pop() element to restore state
  //     newLines.pop();
  //     setLines(newLines);
  //   }
  // };
  // fnCollection - nextStep
  // const handleNextStep = () => {
  //   if (restore.length < 1) {
  //     return;
  //   }
  //   let newLines = lines.slice(); // 淺拷貝
  //   if (newLines.length > 0) {
  //     setLines([...newLines, restore[restore.length - 1]]); // put the pop( element into lines state)
  //     let newRestore = restore.slice(); // 淺拷貝
  //     newRestore.pop();
  //     setRestore(newRestore);
  //   }
  // };

  const handlePrevStep = () => {
    if (lines.length <= 0) {
      return;
    }
    const lastPop = lines[lines.length - 1];
    setLines((currentLines) =>
      produce(currentLines, (draftLines) => {
        if (draftLines.length > 0) {
          draftLines.pop();
        }
      })
    );
    setRestore((currentRestore) => [...currentRestore, lastPop]);
  };

  const handleNextStep = () => {
    if (restore.length <= 0) {
      return;
    }
    const lastPop = restore[restore.length - 1];
    setRestore((currentRestore) =>
      produce(currentRestore, (draftRestore) => {
        if (draftRestore.length > 0) {
          draftRestore.pop();
        }
      })
    );
    setLines((currentLines) => [...currentLines, lastPop]);
  };

  // ------------------------------

  // handle fncollection showUp
  const collectionClickHandler = () => {
    if (collectionActive === "fnCollection grid container") {
      setCollectionActive("fnCollection grid container active");
    } else {
      setCollectionActive("fnCollection grid container");
    }
  };

  return (
    <div className="formatB flex">
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
              image={
                settingInfo.groundSize === "full" ? courtIamge : courtIamge_half
              }
              width={canvasSize.width}
              height={canvasSize.height}
            />
          </Layer>

          {/* Players Layer */}
          <Layer>
            {players.map((player, index) => (
              <Group
                key={index}
                x={player.x}
                y={player.y}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={(e) => handleDragEnd(e, index)}
              >
                <Circle radius={circleRadius} fill={player.color} x={0} y={0} />
                <Text
                  x={-circleRadius} // 根据圆的半径调整文本位置，以使其居中
                  y={-10} // 轻微调整，使文本在圆形中心上方
                  text={player.name}
                  fontSize={10}
                  fill="black"
                  align="center"
                  width={circleRadius * 2}
                ></Text>
              </Group>
              // <Circle
              //   key={index}
              //   x={player.x}
              //   y={player.y}
              //   draggable
              //   onDragStart={(e) => handleDragStart(e, index)}
              //   onDragEnd={(e) => handleDragEnd(e, index)}
              //   radius={circleRadius}
              //   fill={player.color}
              // ></Circle>
            ))}
            {personValue
              ? addPlayers.map((addPlayer, i) => (
                  <Circle
                    key={i}
                    x={addPlayer.x}
                    y={addPlayer.y}
                    draggable
                    onDragStart={(e) => handleAddPlayersDragStart(e, i)}
                    onDragEnd={(e) => handleAddPlayerDragEnd(e, i)}
                    radius={circleRadius}
                    fill="#D25656"
                  ></Circle>
                ))
              : ""}
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
                <img src={data.image} alt="img" />
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

        <div className="fnBox flex" title="Mouse" onClick={switchToMouse}>
          <div className="circle flex">
            <FaComputerMouse className="icon" alt="Mouse" />
          </div>
          {/* <p className="fnText">Settings</p> */}
        </div>

        <div className="fnBox flex" title="Layer">
          <div className="circle flex">
            <MdOutlineDataSaverOn className="icon" alt="Save Layer" />
          </div>
          {/* <p className="fnText">Save Layer</p> */}
        </div>

        <div className="fnBox flex" title="Trash" onClick={handleDeleteLine}>
          <div className="circle flex">
            <FaTrash className="icon" alt="Trash Can" />
          </div>
          {/* <p className="fnText">Trash Can</p> */}
        </div>

        <div className="fnBox flex" title="New Person">
          <div className="circle flex" onClick={handleOpenDialog}>
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
      </div>
      <dialog ref={dialog} className="dialog">
        <div className="close" onClick={handleCloseDialog}>
          <AiFillCloseCircle className="icon" />
        </div>
        <h3>Add Players</h3>
        <input
          id="person"
          type="number"
          max="10"
          min="0"
          onChange={handleAddPlayerChange}
        />
        <div className="btn" onClick={handleSend}>
          send
        </div>
        {personWarning ? <p className="personWarning"> enter 1-10</p> : ""}
        {personNullWarning ? (
          <p className="personWarning"> enter number</p>
        ) : (
          ""
        )}
      </dialog>
    </div>
  );
};

export default FormatB;
