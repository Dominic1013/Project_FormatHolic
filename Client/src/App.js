import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./Components/Layout/Layout";
import NoMatch from "./Components/NoMatch/NoMatch";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Storage from "./pages/Storage/Storage";
import BasketballSetting from "./pages/BasketballSetting/BasketballSetting";
import FormatB from "./pages/FormatB/FormatB";
import SettingInfoRoute from "./Components/SettingInfoRoute/SettingInfoRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/storage" element={<Storage />} />
              <Route path="/settings/*" element={<SettingInfoRoute />} />
              {/* <Route path="basketballSetting" element={<BasketballSetting />} />
              <Route path="formatB" element={<FormatB />} /> */}
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
