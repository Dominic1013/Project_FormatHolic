import React, { useState } from "react";

import "./layout.css";
import { Outlet } from "react-router-dom";

// import icons
import { TbGridDots } from "react-icons/tb";
import { PiSneakerMoveDuotone } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";

const Layout = () => {
  const [active, setActive] = useState("navbar");
  // Function to toggle navBar
  // className navbar is moveAway , activeNavbar is showUp

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

  //  if (session.status === "loading") {
  // if ("loading") {
  //   return <p>Loading...</p>;
  // }
  // if (session.status === "unauthenticated") {
  if ("unauthenticated") {
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
                  <a href="#" className="navLink">
                    Home
                  </a>
                </li>

                <li className="navItem">
                  <a href="#" className="navLink">
                    HowToUse
                  </a>
                </li>
                <button className="btn">
                  <a href="#">Login</a>
                </button>
                <button className="btn">
                  <a href="#">Register</a>
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
  // if (session.status === "authenticated") {
  if ("authenticated") {
    return (
      <>
        <section className="navBarSection">
          {/* toggle hamburger to show the nav, we don't create another nav layout in PC */}
          {/* logo */}
          <header className="header flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
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
                  <a href="#" className="navLink">
                    Home
                  </a>
                </li>

                <li className="navItem">
                  <a href="#" className="navLink">
                    HowToUse
                  </a>
                </li>
                <button className="btn">
                  <a href="#">Save All Formation</a>
                </button>
                <button className="btn">
                  <a href="#">Check All Formation</a>
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
