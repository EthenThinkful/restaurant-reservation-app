import React from "react";
import './Hamburger.css';

function Hamburger() {
    return (
        // <section className={Toggle ? "icon__font__menu" : "nav__list grid"}>
        
        <div className="hamburger__menu">
        <ul>
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
          <li className="new__table">
            <a className="oi oi-layers nav-link" href="/tables/new">
            <div className="ml-1">&nbsp;New Table</div>
            </a>
          </li>
        </ul>
      </div>
    );
}

export default Hamburger;