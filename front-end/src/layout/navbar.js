import React, { useState, useEffect } from "react";
import "./navbar.css";
import "./Menu.css";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update the window width state whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <nav>
        <a id="logo" href="/">
          {/* title and logo */}
          <div className="logo">
            Periodic Tables
            <img
              src="https://user-images.githubusercontent.com/104235709/198115095-b7d574ba-f876-4a3e-8a73-93dbdee749b8.png"
              alt="PTLogo"
              className="ml-3 mt-3"
            />
          </div>
        </a>
        {windowWidth < 768 ? (
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
          </div>
        ) : (
         
            <ul className="dropdown-items-big-screen">
              <li className="nav-item">
                <a className="oi oi-dashboard nav-link" href="/dashboard">
                  <div className="ml-1">&nbsp;Dashboard</div>
                </a>
              </li>
              <li className="nav-item">
                <a className="oi oi-magnifying-glass nav-link" href="/search">
                  <div className="ml-1">&nbsp;Search</div>
                </a>
              </li>
              <li className="nav-item">
                <a className="oi oi-plus nav-link" href="/reservations/new">
                  <div className="ml-1">&nbsp;New Reservation</div>
                </a>
              </li>
              <li className="nav-item">
                <a className="oi oi-layers nav-link" href="/tables/new">
                  <div className="ml-1">&nbsp;New Table</div>
                </a>
              </li>
            </ul>
        
        )}
      </nav>

      <div className={menu_class}>
        <ul className="dropdown-items">
          <li className="nav-item">
            <a className="oi oi-dashboard nav-link" href="/dashboard">
              <div className="ml-1">&nbsp;Dashboard</div>
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-magnifying-glass nav-link" href="/search">
              <div className="ml-1">&nbsp;Search</div>
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-plus nav-link" href="/reservations/new">
              <div className="ml-1">&nbsp;New Reservation</div>
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-layers nav-link" href="/tables/new">
              <div className="ml-1">&nbsp;New Table</div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
