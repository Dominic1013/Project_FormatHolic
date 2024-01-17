import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Storage from "./Components/Storage/Storage";
import BasketballSetting from "./Components/BasketballSetting/BasketballSetting";
import FormatB from "./Components/FormatB/FormatB";
import NoMatch from "./Components/NoMatch/NoMatch";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="storage" element={<Storage />} />
            <Route path="basketballSetting" element={<BasketballSetting />} />
            <Route path="formatB" element={<FormatB />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
