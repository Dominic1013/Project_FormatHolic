import React, { useEffect, useState, useRef } from "react";
import "./storage.scss";
import formatImageApi from "../../api/format.image.api";
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
  const [count, setCount] = useState(0);
  const [formatImages, setFormatImages] = useState([]);

  // warningDelete dialog state
  const [dialogRefs, setDialogRefs] = useState([]);

  //Function to handle close icons click
  useEffect(() => {
    const getFormats = async () => {
      const { response, err } = await formatImageApi.getFormat();

      if (err) console.log(err);
      if (response) {
        setCount(response.length);
        setFormatImages([...response]);
      }
    };

    getFormats();
  }, []);

  //test---------------------
  useEffect(() => {
    console.log(formatImages);
  }, [formatImages]);
  //-------------------------

  const deleteHandler = (index) => {
    //刪除該formatImages內的內容(完成)
    //將刪除後的內容傳到mongoDB（未完成）

    setFormatImages((prevFormatImages) => {
      const newFormatImage = prevFormatImages.filter((_, i) => i !== index);
      return newFormatImage;
    });
    dialogRefs[index].current.close();
  };

  // save all dialog Fn--------------------

  // const warningDialog = React.useRef(null);
  useEffect(() => {
    // 為每個formatImages內的戰術做一個ref
    setDialogRefs(formatImages.map(() => React.createRef()));
  }, [formatImages]);

  const handleOpenSaveAll = (index) => {
    dialogRefs[index].current.showModal();
  };

  const handleCloseSaveAll = (index) => {
    dialogRefs[index].current.close();
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
          <p className="fileNumbers">{count}</p>
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
        {formatImages?.map((data, index) => {
          return (
            <div className="dataDiv flex" key={index}>
              <img src={data.formatImageUrl[0]?.image_path} alt="img" />
              {/* <div className="dataContent">
                <h3>{data.teamName}</h3>
                <p>{data.updateDay} days updated</p>
              </div> */}
              {/* <div className="delete" onClick={() => deleteHandler(index)}> */}
              <div className="delete" onClick={() => handleOpenSaveAll(index)}>
                <AiFillCloseCircle className="icon" />
              </div>

              {/* delete dialog */}
              <dialog ref={dialogRefs[index]} className="warningDialog">
                <div
                  className="close"
                  onClick={() => handleCloseSaveAll(index)}
                >
                  <AiFillCloseCircle className="icon" />
                </div>
                <h3>Do you want to delete this formation?</h3>
                <p>Click "Delete" will delete this formation forever.</p>

                <div className="warningDialogButtons">
                  <div className="btn" onClick={() => deleteHandler(index)}>
                    Delete
                  </div>
                  <div
                    className="btn cancel"
                    onClick={() => handleCloseSaveAll(index)}
                  >
                    Cancel
                  </div>
                </div>
              </dialog>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Storage;
