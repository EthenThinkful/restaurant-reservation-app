import React from "react";
import { useState } from "react";
import "./Menu.css";
import Hamburger from "./Hamburger";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {

  const [Toggle, showMenu] = useState(false);
  
  return (

    <>
    <div className={Toggle ? "no-show-menu" : "show-menu"}>
    <Hamburger Toggle={Toggle}/>
    </div>
    <header className="header">
      <div className="nav container">
      <a className="navbar-brand" id="logo" href="/">
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
      {/* hamburger menu
      <button
        className="navbar-toggler burger__menu"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent20"
        aria-controls="navbarSupportedContent20"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div className="animated-icon1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      end of hamburger menu */}
      {/* actual menu starts here */}
      <button>
      <i className="uil uil-bars icon__font"
      onClick={() => showMenu(!Toggle)}></i>
      </button>
        <div className="nav__menu">
        <ul className="nav__list grid">
          {/* link to dashboard */}
          <li className="nav-item">
            <a className="oi oi-dashboard nav-link" href="/dashboard">
              <div className="ml-1">&nbsp;Dashboard</div>
            </a>
          </li>
          {/* link to search for a reservation by mobile number */}
          <li className="nav-item">
            <a className="oi oi-magnifying-glass nav-link" href="/search">
            <div className="ml-1">&nbsp;Search</div>
            </a>
          </li>
          {/* link to create a new reservation */}
          <li className="nav-item">
            <a className="oi oi-plus nav-link" href="/reservations/new">
            <div className="ml-1">&nbsp;New Reservation</div>
            </a>
          </li>
          {/* link to create a new table */}
          <li className="nav-item">
            <a className="oi oi-layers nav-link" href="/tables/new">
            <div className="ml-1">&nbsp;New Table</div>
            </a>
          </li>
        </ul>
      </div>
      </div>
    </header>
    </>
  );
}

export default Menu;
