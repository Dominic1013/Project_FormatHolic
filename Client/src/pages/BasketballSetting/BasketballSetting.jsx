// planA is your code for add person
// planB is my code for add person

import React, { useState } from "react";
import "./basketballSetting.scss";

const BasketballSetting = () => {
  // Function For groundClick Event
  const [fullGroundClass, setFullGroundClass] = useState(true);
  const [halfGroundClass, setHalfGroundClass] = useState(false);

  // Function For initFormatClick Event
  const [sideClass, setSideClass] = useState(true);
  const [onStageClass, setOnStageClass] = useState(false);

  //planA
  // const [name, setName] = useState("");
  // const [players, setPlayers] = useState([]);
  const [players, setPlayers] = useState("");
  // console.log(players);
  // console.log(typeof players);

  const [settingInfo, setSettingInfo] = useState({
    teamName: "1",
    memberNumber: "3", // turn to number to calc for formatB
    groundSize: "half", // or full
    memberInfo: [],
    initFormat: "side", // or onStage
  });
  console.log(settingInfo);

  // console.log(Number(settingInfo.memberNumber));
  // console.log(typeof Number(settingInfo.memberNumber));

  const handleAllChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "teamName") {
      // console.log("success");
      setSettingInfo({ ...settingInfo, teamName: e.target.value });
    }
    if (e.target.id === "person") {
      // console.log("success");
      setSettingInfo({ ...settingInfo, memberNumber: e.target.value });
      setPlayers(e.target.value);
    }

    //groundSize in handlefullGroundClick & handlehalfGroundClick

    // memberInfo

    // if(e.target.key ===)

    //initFormat in handleSideClassClick & handleOnStageClick
  };

  const handleInput = (index, field, value) => {
    setSettingInfo((prevSettingInfo) => {
      const newMemberInfo = [...prevSettingInfo.memberInfo];
      if (!newMemberInfo[index]) {
        // default value
        newMemberInfo[index] = { name: "", color: "#000000" };
      }
      newMemberInfo[index][field] = value;

      return { ...prevSettingInfo, memberInfo: newMemberInfo };
    });
  };

  const handlefullGroundClick = () => {
    setFullGroundClass(true);
    setHalfGroundClass(false);
    setSettingInfo({ ...settingInfo, groundSize: "full" });
  };

  const handlehalfGroundClick = () => {
    setFullGroundClass(false);
    setHalfGroundClass(true);
    setSettingInfo({ ...settingInfo, groundSize: "half" });
  };

  const handleSideClassClick = () => {
    setSideClass(true);
    setOnStageClass(false);
    setSettingInfo({ ...settingInfo, initFormat: "side" });
  };

  const handleOnStageClick = () => {
    setSideClass(false);
    setOnStageClass(true);
    setSettingInfo({ ...settingInfo, initFormat: "onStage" });
  };

  // // planA
  // const handleChange = (e) => {
  //   setName(e.target.value);
  // };
  // // planA
  // const handleAddPlayer = () => {
  //   if (name.trim() !== "") {
  //     const newPlayers = { id: Date.now(), name: name };
  //     setPlayers([...players, newPlayers]);
  //     setName("");
  //   }
  // };
  // // planA
  // const handleRemove = (id) => {
  //   const newPlayers = players.filter((player) => player.id !== id);
  //   setPlayers(newPlayers);
  // };

  return (
    <section className="basketballSetting container section flex">
      <form
        onChange={handleAllChange}
        method="POST"
        className="settingForm flex"
      >
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
              <div
                className={
                  fullGroundClass ? "imageDiv groundActive" : "imageDiv"
                }
                onClick={handlefullGroundClick}
              >
                <img src="/settingMedia/ground_full.jpg" alt="ground_full" />
              </div>

              <div
                className={
                  halfGroundClass ? "imageDiv groundActive" : "imageDiv"
                }
                onClick={handlehalfGroundClick}
              >
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

            {/* planB */}
            <div className="nameColorInputs">
              {Array.from({ length: Number(players) }, (_, index) => (
                <div className="nameColorInput grid" key={index}>
                  <input
                    type="text"
                    className="nameInput"
                    placeholder="ex: Mark or 1"
                    value={settingInfo.memberInfo[index]?.name || ""}
                    onChange={(e) => handleInput(index, "name", e.target.value)}
                  />
                  <input
                    type="color"
                    className="colorInput"
                    value={settingInfo.memberInfo[index]?.color || "#000000"}
                    onChange={(e) =>
                      handleInput(index, "color", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* planA */}
            {/* <div className="nameColorInputs grid">
              <input
                type="text"
                className="nameInput"
                placeholder="ex: Mark or 1"
                onChange={handleChange}
                value={name}
              />

              <box onClick={handleAddPlayer}>add</box>
              <input type="color" className="colorInput" />
            </div>

            {players &&
              players.map((player) => (
                <div style={{ display: "flex " }} id={player.id}>
                  <p>{player.name}</p>
                  <box
                    style={{ paddingLeft: "10px" }}
                    onClick={() => handleRemove(player.id)}
                  >
                    delete
                  </box>
                </div>
              ))} */}
          </div>

          {/* add images */}
          <div className="initFormatDiv flex">
            <h3 className="icon">✏️</h3>

            {/* add images */}
            <div className="imageDivs flex">
              <div
                className={sideClass ? "imageDiv initFormatActive" : "imageDiv"}
                onClick={handleSideClassClick}
              >
                <img
                  src="/settingMedia/ground_initFormat.jpg"
                  alt="ground_sideClass"
                />
              </div>

              <div
                className={
                  onStageClass ? "imageDiv initFormatActive" : "imageDiv"
                }
                onClick={handleOnStageClick}
              >
                <img
                  src="/settingMedia/ground_initFormat2.jpg"
                  alt="ground_onStageClass"
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
