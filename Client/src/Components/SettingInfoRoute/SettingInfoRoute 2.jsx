import React from "react";

import { Routes, Route } from "react-router-dom";
import BasketballSetting from "../../pages/BasketballSetting/BasketballSetting";
import FormatB from "../../pages/FormatB/FormatB";
import { SettingProvider } from "../../SettingInfoContext";

const SettingInfoRoute = () => {
  return (
    <SettingProvider>
      <Routes>
        <Route path="basketballSetting" element={<BasketballSetting />} />
        <Route path="formatB" element={<FormatB />} />
      </Routes>
    </SettingProvider>
  );
};

export default SettingInfoRoute;
