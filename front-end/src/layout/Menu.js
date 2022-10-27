import React from "react";


import "./Menu.css";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {

  return (
    
    <nav className="navBar">
      <div className="justifyNav">
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
      >
        <div className="animated-icon1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      </div>

      <div className="collapse navbar-collapse" id="navbarSupportedContent20">
        <ul className="navBar-nav">
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
