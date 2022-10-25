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
    
    <nav class="navbar navbar-light amber lighten-4 mb-4">
      <a class="navbar-brand" href="/">
        Periodic Tables
      </a>

      <button
        class="navbar-toggler first-button"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent20"
        aria-controls="navbarSupportedContent20"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div class="animated-icon1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent20">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Features
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
