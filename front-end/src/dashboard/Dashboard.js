import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import TablesList from "./TablesList";
import { formatAsTime, previous, next, today } from "../utils/date-time";
import "./Dashboard.css";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const urlQuery = useLocation().search;
  const dateQueryStart = urlQuery.search("date") + 5;
  date = urlQuery.slice(dateQueryStart, dateQueryStart + 10) || date;

  useEffect(loadDashboard, [date]);

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

  const reservationsList = reservations.map((reservation, index) => (
    <ReservationsList
      key={index}
      reservation={reservation}
      formatTime={formatAsTime}
    />
  ));

  const tablesList = tables.map((table, index) => (
    <TablesList key={index} table={table} loadDashboard={loadDashboard} />
  ));

  const previousHandler = () => {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  };

  const nextHandler = () => {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  };

  const todayHandler = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`);
  };

    return (
      <main>
        <div className="message-window">
          <div>
            <h1 className="animated-text">
              {new Date().getHours() < 12 ? "Good morning" : "Good evening"}
            </h1>
            <div className="description">
              Simplify your Restaurant Management
            </div>
          </div>
          <div id="restaurant-picture" className="display-picture"></div>
        </div>
        <div className="col-12 flex-wrap d-flex flex-wrap justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div className="row justify-content-around my-3">
          <button
            type="button"
            name="previous-btn"
            className="ml-auto btn btn-secondary colorfulBtnTwo"
            onClick={previousHandler}
          >
            Previous
          </button>
          <button
            type="button"
            name="next-btn"
            className="mx-3 btn btn-secondary colorfulBtnTwo"
            onClick={nextHandler}
          >
            Next
          </button>
          <button
            type="button"
            name="today"
            className="mr-auto btn btn-secondary colorfulBtnTwo"
            onClick={todayHandler}
          >
            Today
          </button>
        </div>
        {reservationsError ? (
          <ErrorAlert errorMessage={reservationsError} />
        ) : (
          <></>
        )}

        <div className="row reservations-list">
          {reservationsList.length === 0 ? (
            <div id="no-reservations">
              <h3 className="ml-5">There are no reservations for this date.</h3>
            </div>
          ) : (
            reservationsList
          )}
        </div>

        <div className="row">
          {tablesList.length === 0 ? (
            <h3 className="ml-5">No Tables Listed</h3>
          ) : (
            tablesList
          )}
        </div>
      </main>
    );
  } 


export default Dashboard;
