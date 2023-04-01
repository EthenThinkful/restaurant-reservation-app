import React from "react";
import "./Menu.css";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {

  return (
    
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

      {/* hamburger menu button for mobile view */}
      <button
        className="navbar-toggler first-button"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent20"
        aria-controls="navbarSupportedContent20"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {/* hamburger menu spans */}
        <div className="animated-icon1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {/* actual menu starts here */}
      {/* <div className="collapse navbar-collapse" id="navbarSupportedContent20"> */}
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
  );
}

export default Menu;
