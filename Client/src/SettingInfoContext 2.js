// 包裹器
import React, { createContext, useContext, useState } from "react";

const SettingContext = createContext();

export const useSetting = () => useContext(SettingContext);

export const SettingProvider = ({ children }) => {
  const [settingInfo, setSettingInfo] = useState({
    teamName: "",
    memberNumber: "", // turn to number to calc for formatB
    groundSize: "half", // or full
    memberInfo: [],
    initFormat: "side", // or onStage
  });

  return (
    <SettingContext.Provider value={{ settingInfo, setSettingInfo }}>
      {children}
    </SettingContext.Provider>
  );
};
