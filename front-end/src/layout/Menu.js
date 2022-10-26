import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import Hamburger from "hamburger-react";

import "./Menu.css";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(true);

  return (
    //     <div id="background-container" className="row d-flex justify-content-between side-bar">
    //     <Link to="/">
    //       <div className="col d-flex flex-wrap">
    //         <span id="logo">Periodic Tables</span>
    //       </div>
    //     </Link>
    //     <nav>
    //       {open ?
    //     <ul id="accordionSidebar">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/dashboard">
    //           <span className="oi oi-dashboard" />
    //           &nbsp;Dashboard
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/search">
    //           <span className="oi oi-magnifying-glass" />
    //           &nbsp;Search
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/reservations/new">
    //           <span className="oi oi-plus" />
    //           &nbsp;New Reservation
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/tables/new">
    //           <span className="oi oi-layers" />
    //           &nbsp;New Table
    //         </Link>
    //       </li>
    //     </ul>
    //     : null}
    //     <div className="hamburger"
    //     onClick={() => {
    //       setOpen(!open);

    //       }}>
    //       <span class="bar"

    //       ></span>
    //       <span class="bar"

    //       ></span>
    //       <span class="bar"

    //       ></span>
    //     </div>
    //     {/* <div className="text-center d-none d-md-inline">
    //       <button
    //         className="btn rounded-circle border-0"
    //         id="sidebarToggle"
    //         type="button"
    //       />
    //     </div> */}
    // </nav>
    // </div>

    <nav className="navbar navbar-light amber mb-4">
      <a className="navbar-brand" id="logo" href="/">
      <div className="logo ml-2" >
        Periodic Tables
          <img
            src="https://user-images.githubusercontent.com/104235709/198115095-b7d574ba-f876-4a3e-8a73-93dbdee749b8.png"
            alt="PTLogo"
            className="ml-3 mt-3"
          />
        </div>
      </a>

      <button
        className="navbar-toggler first-button"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent20"
        aria-controls="navbarSupportedContent20"
        aria-expanded="false"
        aria-label="Toggle navigation"
        //trying to animate the spans on click with the useState()
      >
        <div className={animate ? "animated-icon1" : "animated-icon1.open"}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent20">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="oi oi-dashboard nav-link" href="/dashboard">
              &nbsp;Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-magnifying-glass nav-link" href="/search">
              Search
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-plus nav-link" href="/reservations/new">
              &nbsp;New Reservation
            </a>
          </li>
          <li className="nav-item">
            <a className="oi oi-layers nav-link" href="/tables/new">
              &nbsp;New Table
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
