import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../dashboard/ReservationsList";
import { formatAsTime } from "../utils/date-time";
import "./Search.css";
import { formatPhoneNumber } from "../utils/format-phone-number";

const { REACT_APP_API_BASE_URL } = process.env;

// Component used for searching a reservation by mobile number.
function Search() {
  const [formState, setFormState] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [altMessage, setAltMessage] = useState("")

  // sets formState to inputed mobile number 
  function changeHandler({ target }) {
    setFormState(target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    // fetches reservation based off of formState value (mobile number)
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/reservations?mobile_number=${formState}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const resData = await response.json();
    if (resData.data.length === 0) {
      setAltMessage("No reservations found.");
  }
  // sets "reservations" useState to hold the reservation(s) data
    if (response.status !== 400) {
        setReservations(resData.data);
    }
    if (resData.error) {
        setReservationsError(resData.error)
    }
  }

  // holds/renders reservation card(s) data
  const reservationsList = reservations.map((reservation, index) => {
    return (
      <ReservationList
        key={index}
        reservation={reservation}
        formatTime={formatAsTime}
      />
    );
  });

  return (
    <div className="search_center">
        <div>{reservationsError ? <ErrorAlert errorMessage={reservationsError} /> : <></>}</div>
      <form onSubmit={submitHandler}>
      <div class="form-group mb-2">
        <div className="search-text">Search</div>
        </div>
        <div class="form-group mx-sm-3 mb-2">
        <input
          required
          name="mobile_number"
          id="mobile_number"
          onChange={changeHandler}
          placeholder="Enter a customer's phone number"
          className="search-input"
          value={formatPhoneNumber(formState)}
        ></input>
        </div>
        <button type="submit" class="search__button btn mt-3">Find</button>
      </form>
      {/* renders the reservation card(s) found or displays "No reservations found." */}
      <div className="reservations-list">{reservationsList.length === 0 ? <h3>{altMessage}</h3> : reservationsList}</div>
    </div>
  );
}

export default Search;
