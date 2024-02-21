import React, { useState } from "react";

import "./layout.scss";
import { Outlet } from "react-router-dom";

// import icons
import { TbGridDots } from "react-icons/tb";
import { PiSneakerMoveDuotone } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user.slice";

const Layout = () => {
  const { user } = useSelector((state) => state.user);

  const [active, setActive] = useState("navbar");
  // Function to toggle navBar
  // className navbar is moveAway , activeNavbar is showUp
  const dispatch = useDispatch();
  // Function to hamburger
  const changeNavbarState = () => {
    if (active === "navbar") {
      setActive("navbar activeNavbar");
    } else {
      setActive("navbar");
    }
  };

  // Function to remove navbar
  const removeNavbar = () => {
    setActive("navbar");
  };

  // 未登入
  if (!user) {
    return (
      <>
        <section className="navBarSection">
          {/* toggle hamburger to show the nav, we don't create another nav layout in PC */}
          {/* logo */}
          <header className="header flex">
            <div className="logoDiv">
              <a href="/" className="logo flex">
                <h3>
                  <PiSneakerMoveDuotone className="icon" />
                  FormatHolic
                </h3>
              </a>
            </div>
            {/* navbarLinks */}
            <div className={active}>
              <ul className="navbarLists flex">
                <li className="navItem">
                  <a href="" className="navLink">
                    Home
                  </a>
                </li>

                <li className="navItem">
                  <a href="" className="navLink">
                    HowToUse
                  </a>
                </li>
                <button className="btn">
                  <a href="/login">Login</a>
                </button>
                <button className="btn">
                  <a href="/register">Register</a>
                </button>
                <div className="closeNavbar" onClick={removeNavbar}>
                  <AiFillCloseCircle className="icon" />
                </div>
              </ul>
            </div>

            {/* hamburger */}
            <div className="toggleNavbar" onClick={changeNavbarState}>
              <TbGridDots className="icon" />
            </div>
          </header>
        </section>
        <Outlet />
      </>
    );
  }
  // 已經登入
  if (user) {
    return (
      <>
        <section className="navBarSection">
          {/* toggle hamburger to show the nav, we don't create another nav layout in PC */}
          {/* logo */}
          <header className="header flex">
            <div className="logoDiv">
              <a href="" className="logo flex">
                <h3>
                  <PiSneakerMoveDuotone className="icon" />
                  FormatHolic
                </h3>
              </a>
            </div>
            {/* navbarLinks */}
            <div className={active}>
              <ul className="navbarLists flex">
                <li className="navItem">
                  <a href="" className="navLink">
                    Home
                  </a>
                </li>

                <li className="navItem">
                  <a href="" className="navLink">
                    HowToUse
                  </a>
                </li>

                {/* 這個應該要提交送出所有的變動 */}
                <button className="btn">
                  <a href="">Save All Formation</a>
                </button>

                <button className="btn">
                  <a href="/storage">Check All Formation</a>
                </button>

                <button className="btn" onClick={() => dispatch(setUser(null))}>
                  Logout
                </button>

                <div className="closeNavbar" onClick={removeNavbar}>
                  <AiFillCloseCircle className="icon" />
                </div>
              </ul>
            </div>

            {/* hamburger */}
            <div className="toggleNavbar" onClick={changeNavbarState}>
              <TbGridDots className="icon" />
            </div>
          </header>
        </section>
        <Outlet />
      </>
    );
  }
};

export default Layout;
