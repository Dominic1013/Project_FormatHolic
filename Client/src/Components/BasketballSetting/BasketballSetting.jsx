import React, { useState } from "react";
import "./basketballSetting.css";

const BasketballSetting = () => {
  // Function For groundClick Event
  const [fullGroundClick, setFullGroundClick] = useState(
    "imageDiv groundActive"
  );
  const [halfGroundClick, setHalfGroundClick] = useState("imageDiv");

  // Function For initFormatClick Event
  const [initFormatClick1, setInitFormatClick1] = useState(
    "imageDiv initFormatActive"
  );
  const [initFormatClick2, setInitFormatClick2] = useState("imageDiv");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  console.log(players);

  const groundClickHandler = () => {
    // clear another one's active
    if (fullGroundClick === "imageDiv") {
      setHalfGroundClick("imageDiv");
      setFullGroundClick("imageDiv  groundActive");
    } else {
      setHalfGroundClick("imageDiv groundActive");
      setFullGroundClick("imageDiv");
    }
  };

  const initFormatClick1Handler = () => {
    // clear another one's active
    if (initFormatClick1 === "imageDiv") {
      setInitFormatClick2("imageDiv");
      setInitFormatClick1("imageDiv initFormatActive");
    } else {
      setInitFormatClick1("imageDiv");
      setInitFormatClick2("imageDiv initFormatActive");
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleAddPlayer = () => {
    if (name.trim() !== "") {
      const newPlayers = { id: Date.now(), name: name };
      setPlayers([...players, newPlayers]);
      setName("");
    }
  };

  const handleRemove = (id) => {
    const newPlayers = players.filter((player) => player.id !== id);
    setPlayers(newPlayers);
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
              <div className={fullGroundClick} onClick={groundClickHandler}>
                <img src="/settingMedia/ground_full.jpg" alt="ground_full" />
              </div>

              <div className={halfGroundClick} onClick={groundClickHandler}>
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
                onChange={handleChange}
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
              ))}
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
                onClick={initFormatClick1Handler}
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
