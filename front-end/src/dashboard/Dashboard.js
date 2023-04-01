import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import TablesList from "./TablesList";
import { formatAsTime, previous, next, today } from "../utils/date-time";
import "./Dashboard.css";

function Dashboard({ date }) {
  // useStates for data manipulation
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory(); // Declaration of useHistory (used on previous, next, & today buttons).

  const urlQuery = useLocation().search;
  const dateQueryStart = urlQuery.search("date") + 5;
  date = urlQuery.slice(dateQueryStart, dateQueryStart + 10) || date;

  useEffect(loadDashboard, [date]); // Only re-run loadDashboard if date changes

  // Loads our useState arrays for reservations / tables with any existing data
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError); // errors fetching tables adds to reservationsError array

    return () => abortController.abort();
  }

  // renders our reservations list
  const reservationsList = reservations.map((reservation, index) => (
    <ReservationsList
      key={index}
      reservation={reservation}
      formatTime={formatAsTime}
    />
  ));

  // renders our tables list
  const tablesList = tables.map((table, index) => (
    <TablesList key={index} table={table} loadDashboard={loadDashboard} />
  ));

  // (useHistory) redirects user to the previous date
  const previousHandler = () => {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  };

  // (useHistory) redirects user to the next date
  const nextHandler = () => {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  };

  // (useHistory) redirects user to today's date
  const todayHandler = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`);
  };

  return (
    <section className="home section">
      <div className="animated-text">
          {new Date().getHours() < 12 ? "Good morning" : "Good evening"}
      </div>
      <div className="home__container container">
        <div className="home__content">
        <img
            className="restaurant-picture"
            src="https://user-images.githubusercontent.com/104235709/189022780-2b1e6a45-fb8d-4b86-845d-658b2d2b952f.jpg"
            alt="restaurantPhoto"
          />
          <img
            className="restaurant-pictureTwo"
            src="https://user-images.githubusercontent.com/104235709/189022780-2b1e6a45-fb8d-4b86-845d-658b2d2b952f.jpg"
            alt="restaurantPhoto"
          />
          
            <h1 className="home__title">Periodic Tables 
          <div className="description">
            Simplify your Restaurant Management. A robust and intuitive app that
            helps you manage your reservations, tables, and organization.
          </div>
          </h1>
          </div>
          <h1 className="home__titleTwo">Periodic Tables 
          <div className="descriptionTwo">
            Simplify your Restaurant Management. A robust and intuitive app that
            helps you manage your reservations, tables, and organization.
          </div>
          </h1>
      </div>
      
      {/* adding... below */}
      <div className="reservation-date">
        <div className=" d-flex  justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div className="row my-4">
          {/* useHistory buttons */}
          <button
            type="button"
            name="previous-btn"
            className="ml-auto btn today__button"
            onClick={previousHandler}
          >
            Previous
          </button>
          <button
            type="button"
            name="next-btn"
            className="mx-3 btn today__button"
            onClick={nextHandler}
          >
            Next
          </button>
          <button
            type="button"
            name="today"
            className="mr-auto btn today__button"
            onClick={todayHandler}
          >
            Today
          </button>
        </div>

        {/* Make sure any errors are displayed */}
        {reservationsError ? (
          <ErrorAlert errorMessage={reservationsError} />
        ) : (
          <></>
        )}
      </div>
      {/* Lets user know if there aren't any reservations with a message or renders any existing reservations. */}
      <div className="reservations-list">
        {reservationsList.length === 0 ? (
          // changed below
          <div id="no-reservations">
            <h5>There are no reservations for this date.</h5>
          </div>
        ) : (
          reservationsList
        )}
      </div>
      {/* Lets user know if there aren't any tables with a message or renders any existing tables. */}
      <div className="tables_list">
        {tablesList.length === 0 ? (
          <h3 className="ml-5">No Tables Listed</h3>
        ) : (
          tablesList
        )}
      </div>
    </section>
  );
}

export default Dashboard;
