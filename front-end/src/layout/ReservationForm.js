import React from "react";
import ErrorAlert from "./ErrorAlert";
import './ReservationForm.css'


function ReservationForm({reservationData, setReservationData, submitHandler, cancelHandler, error, changeHandler}) {

    return (
        <div>
          <ErrorAlert error={error} /> 
          <form class="needs-validation center " onSubmit={submitHandler}>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label htmlFor="first_name" className="field">First Name</label>
                <input
                  required
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={reservationData.first_name}
                  className="background-color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="last_name" className="field">Last Name</label>
                <input
                  required
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={reservationData.last_name}
                  className="background-color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="mobile_number" className="field">Reservation Contact Number</label>
                <input
                  required
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="xxx-xxx-xxxx"
                  value={reservationData.mobile_number}
                  className="background-color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="reservation_date" className="field">Reservation Date</label>
                <input
                  required
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  placeholder={new Date()}
                  value={reservationData.reservation_date}
                  className="background-color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="reservation_time" className="field">Reservation Start Time</label>
                <input
                  required
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  value={reservationData.reservation_time}
                  onChange={changeHandler}
                  className="background-color"
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="people" className="field">Number of Guests</label>
                <input
                  required
                  type="number"
                  id="people"
                  name="people"
                  value={reservationData.people}
                  onChange={changeHandler}
                  className="background-color"
                ></input>
              </div>
              </div>
              <br />
              <button
                type="button"
                name="cancel-btn"
                onClick={cancelHandler}
                className="btn btn-secondary button-position mt-0"
              >
                Cancel
              </button>
              <button type="submit" name="submit-btn" className="btn btn-secondary button-position mt-0">
                Submit
              </button>
            
          </form>
        </div>
      );
}

export default ReservationForm;