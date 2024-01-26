import React from "react";
import "./home.css";

// import icons
import { FaBookMedical } from "react-icons/fa";

const Home = () => {
  return (
    <section className="home section container flex">
      <div className="text">
        <h2>🕺 FormatHolic ⛹️‍♂️</h2>
        <p>Perfect to format your idea</p>
      </div>

      <div className="videoBoxes container flex">
        {/* 兩張圖片或影像 */}

        <div className="videoBox">
          <div className="overlay"></div>
          <video
            src="/homeMedia/danceVideo1.mp4"
            type="video/mp4"
            muted
            autoPlay
            loop
          ></video>
          <button className="choose btn flex">
            <a href="#">Dance</a>
          </button>
        </div>

        <div className="videoBox">
          <div className="overlay"></div>
          <video
            src="/homeMedia/basketballVideo1.mp4"
            type="video/mp4"
            muted
            autoPlay
            loop
          ></video>
          <button className="choose btn flex">
            <a href="/basketballSetting">Basketball</a>
          </button>
        </div>
      </div>

      <button className="howToUse btn flex">
        <a href="#">
          How To Use <FaBookMedical className="icon" />
        </a>
      </button>
    </section>
  );
};

export default Home;
