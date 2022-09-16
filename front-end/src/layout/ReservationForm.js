import React from "react";
import ErrorAlert from "./ErrorAlert";


function ReservationForm({reservationData, setReservationData, submitHandler, cancelHandler, error, changeHandler}) {

    return (
        <div>
          <ErrorAlert error={error} /> 
          <form class="needs-validation center " onSubmit={submitHandler}>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label htmlFor="first_name" className="mr-2">First Name</label>
                <input
                  required
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={reservationData.first_name}
                  className="background_color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="last_name" className="mr-2">Last Name</label>
                <input
                  required
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={reservationData.last_name}
                  className="background_color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="mobile_number" className="mr-2">Reservation Contact Number</label>
                <input
                  required
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="xxx-xxx-xxxx"
                  value={reservationData.mobile_number}
                  className="background_color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="reservation_date" className="mr-2">Reservation Date</label>
                <input
                  required
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  placeholder={new Date()}
                  value={reservationData.reservation_date}
                  className="background_color"
                  onChange={changeHandler}
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="reservation_time" className="mr-2">Reservation Start Time</label>
                <input
                  required
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  // placeholder="HH:MM:SS"
                  value={reservationData.reservation_time}
                  onChange={changeHandler}
                  className="background_color"
                ></input>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlFor="people" className="mr-2">Number of Guests</label>
                <input
                  required
                  type="number"
                  id="people"
                  name="people"
                  value={reservationData.people}
                  onChange={changeHandler}
                  className="background_color"
                ></input>
              </div>
              </div>
              <br />
              <button
                type="button"
                name="cancel-btn"
                onClick={cancelHandler}
                className="btn btn-primary button-position"
              >
                Cancel
              </button>
              <button type="submit" name="submit-btn" className="btn btn-secondary button-position">
                Submit
              </button>
            
          </form>
        </div>
      );
}

export default ReservationForm;