import React, { useState } from "react";
import "./basketballSetting.css";

const BasketballSetting = () => {
  // Function For groundClick Event
  const [fullGroundClick, setFullGroundClick] = useState(
    "imageDiv groundActive"
  );
  const [halfGroundClick, setHalfGgroundClick] = useState("imageDiv");
  const fullGroundClickHandler = () => {
    // clear another one's active
    setHalfGgroundClick("imageDiv");
    setFullGroundClick("imageDiv groundActive");
  };
  const halfGroundClickHandler = () => {
    // clear another one's active
    setFullGroundClick("imageDiv");
    setHalfGgroundClick("imageDiv groundActive");
  };

  // Function For initFormatClick Event
  const [initFormatClick1, setInitFormatClick1] = useState(
    "imageDiv initFormatActive"
  );
  const [initFormatClick2, setInitFormatClick2] = useState("imageDiv");
  const initFormatClick1Handler = () => {
    // clear another one's active
    setInitFormatClick2("imageDiv");
    setInitFormatClick1("imageDiv initFormatActive");
  };
  const initFormatClick2Handler = () => {
    // clear another one's active
    setInitFormatClick1("imageDiv");
    setInitFormatClick2("imageDiv initFormatActive");
  };

  return (
    <section className="basketballSetting container section">
      <form method="POST" className="settingForm flex">
        <div className="logoDiv">🏀</div>
        <div className="teamNameDiv flex">
          <input type="text" id="teamName" placeholder="Enter Your Team Name" />
        </div>
        <div className="firstBox">
          <div className="personDiv flex ">
            <label for="person" className="icon">
              ⛹️‍♂️
            </label>
            <input
              type="text"
              id="person"
              placeholder="Enter Your Member Number"
            />
          </div>

          <div className="groundDiv flex ">
            <h3 className="icon">🏔</h3>

            {/* add images */}
            <div className="imageDivs flex">
              <div className={fullGroundClick} onClick={fullGroundClickHandler}>
                <img src="/settingMedia/ground_full.jpg" alt="ground_full" />
              </div>

              <div className={halfGroundClick} onClick={halfGroundClickHandler}>
                <img
                  src="/settingMedia/ground_fullOverlay.jpg"
                  alt="ground_half"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="secondBox">
          <div className="nameColorDiv flex">
            <label for="nameColor" className="icon">
              🎨
            </label>
            <div className="nameColorInputs grid">
              <input
                type="text"
                className="nameInput"
                placeholder="ex: Mark or 1"
              />
              <input type="color" className="colorInput" />
              <input type="text" className="nameInput" />
              <input type="color" className="colorInput" />
              <input type="text" className="nameInput" />
              <input type="color" className="colorInput" />
              <input type="text" className="nameInput" />
              <input type="color" className="colorInput" />
              <input type="text" className="nameInput" />
              <input type="color" className="colorInput" />
            </div>
          </div>

          {/* add images */}
          <div className="initFormatDiv flex">
            <h3 className="icon">✏️</h3>

            {/* add images */}
            <div className="imageDivs flex">
              <div
                className={initFormatClick1}
                onClick={initFormatClick1Handler}
              >
                <img
                  src="/settingMedia/ground_initFormat.jpg"
                  alt="ground_initFormat"
                />
              </div>

              <div
                className={initFormatClick2}
                onClick={initFormatClick2Handler}
              >
                <img
                  src="/settingMedia/ground_initFormat2.jpg"
                  alt="ground_initFormat2"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="allSubmit btn">All Submit</button>
      </form>
    </section>
  );
};

export default BasketballSetting;
