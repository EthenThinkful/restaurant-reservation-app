import React from "react";
import "./ReservationList.css";
import { useHistory } from "react-router";

const { REACT_APP_API_BASE_URL } = process.env;

function ReservationList({ reservation, formatTime, loadDashboard }) {
  const history = useHistory(); // for redirection purposes

  // De-constructing needed values from reservation
  const { first_name, last_name, mobile_number, reservation_time, reservation_date, people, status, reservation_id } =
    reservation;

  let formattedTime = formatTime(reservation_time);
  let formattedHours = Number(formattedTime.slice(0,2)) > 12 ? Number(formattedTime.slice(0,2) % 12) : Number(formattedTime.slice(0,2));
  formattedTime = `${formattedHours}${formattedTime.slice(2)}`;

  // Send PUT request to change reservation status in the database to "cancelled"
  const cancelHandler = async (e) => {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}/status`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({data: { status: "cancelled" } }),
            
          }, history.go(0)); // Reloads current page after cancellation
          return response;
    }
  }

  if (reservation.status !== "cancelled") { // Only renders a reservation if status column in database is NOT set to cancelled
  return (
      <div className="reservation-card">
      <div id="card-title">Reservation for {formattedTime} {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12 ? "AM" : "PM"}</div>
      <div className="text-center">
        <h6 id="card-label">Name:</h6>
        <p id="card-text">{first_name} {last_name}</p>
        <h6 id="card-label">Contact Number:</h6>
        <p id="card-text">{mobile_number}</p>
        <h6 id="card-label">Number of Guests:</h6>
        <p id="card-text">{people}</p>
        <h6 id="card-label">Status:</h6>
        <p id="card-text" data-reservation-id-status={reservation.reservation_id}>{status}</p>
        {/* conditionally rendering buttons only if reservation status is set to "Booked" */}
        {status === "Booked" ? <button type="button"  className="btn btn-secondary m-6 mr-2"> <a className="text-light" href={`/reservations/${reservation_id}/seat`}>Seat</a></button> : null}
        {status === "Booked" ? <button type="button" className="btn btn-secondary m-6 mr-2"> <a className="text-light" href={`/reservations/${reservation_id}/edit`}>Edit</a> </button> : null}
        {status === "Booked" ? <button type="button" className="btn btn-secondary text-light" data-reservation-id-cancel={reservation.reservation_id} onClick={cancelHandler}> <div> Cancel </div> </button> : null}
        </div>
      </div>
  )} else {return null}  
}

export default ReservationList;