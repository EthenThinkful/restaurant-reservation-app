import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationsList";
import { formatAsTime, previous, next, today as todayFn } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ today }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(today)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationslist = reservations.map((reservation, index) => (
    <ReservationList
      key={index}
      reservation={reservation}
      date={date}
      formatTime={formatAsTime}
    />
  ));

  return (
    <main>
      <h1>{new Date().getHours() < 12 ? "Good morning." : "Good evening."}</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="row justify-content-around my-3">
        <button type="button" name="previous-btn" className="ml-auto" onClick={()=> setDate(previous(date))}>Previous</button>
        <button type="button" name="next-btn" className="mx-3" onClick={()=> setDate(next(date))}>Next</button>
        <button type="button" name="today" className="mr-auto" onClick={()=> setDate(todayFn())}>Today</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <hr />
      <div className="row">{reservationslist}</div>     
    </main>
  );
}

export default Dashboard;
