import React, { useState } from "react";
import "./storage.css";

// import icons
import { FaSave } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

// test data
const testData = [
  {
    id: 0,
    img: "/settingMedia/ground_initFormat.jpg",
    teamName: "teamName1",
    updateDay: "0",
    link: "#",
    // the other data...
  },
  {
    id: 1,
    img: "/settingMedia/ground_initFormat2.jpg",
    teamName: "teamName222",
    updateDay: "1",
    link: "#",
    // the other data...
  },
  {
    id: 2,
    img: "/settingMedia/ground_initFormat2.jpg",
    teamName: "teamName33",
    updateDay: "2",
    link: "#",
    // the other data...
  },
  {
    id: 3,
    img: "/settingMedia/ground_initFormat.jpg",
    teamName: "teamName4",
    updateDay: "3",
    link: "#",
    // the other data...
  },
];

const Storage = () => {
  const [dataStyle, setDataStyle] = useState("dataDiv flex");
  //Function to handle close icons click
  const deleteHandler = (e) => {
    alert(e.target + "你好");

    // setDataStyle("dataDiv flex deleteDiv");
  };

  return (
    <section className="storageSection container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="firstBox flex">
        <div className="save item flex">
          <FaSave className="icon" />
          <h3>File</h3>

          {/* p要改成資料的真正數量 */}
          <p className="fileNumbers">4</p>
        </div>

        <div className="BackHome item flex">
          <a href="/" className="flex">
            <FaHome className="icon" />
            <h3>Home</h3>
          </a>
        </div>
      </div>
      {/* --------------------------------------------- */}
      <div className="secondBox flex">
        {/* simulate the DB data to mapping */}
        {testData.map((data) => {
          return (
            <div className={dataStyle}>
              <img src={data.img} alt="img" />
              <div className="dataContent">
                <h3>{data.teamName}</h3>
                <p>{data.updateDay} days updated</p>
              </div>
              <div className="delete">
                <AiFillCloseCircle className="icon" onClick={deleteHandler} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Storage;
