import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "./ErrorAlert";
import loadDashboard from "../dashboard/Dashboard"
import "./NewReservation.css";

const { REACT_APP_API_BASE_URL } = process.env;

function Edit() {
    const history = useHistory();
    const { reservation_id }  = useParams();

    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 0,
    };
  
    const [formState, setFormState] = useState(initialFormState);
    const [error, setError] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    //USED TO RENDER CURRENT FORM DATA TO BE EDITABLE
    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadReservation() {
          const response = await fetch(
            `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const resData = await response.json();
          setFormState({
            ...resData.data,
            reservation_date: resData.data.reservation_date.slice(0, 10),
          });
        }
    
        loadReservation();
    
        return () => abortController.abort();
      }, [reservation_id]);
  
    const changeHandler = ({ target }) => {
      setFormState({ ...formState, [target.name]: target.name === "people" ? Number(target.value) : target.value });
    };

    // CANCEL HANDLER
    const cancelHandler = () => {
    //   setFormState({ ...initialFormState });
      history.goBack();
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      
      const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({data: formState}),
      })
      const resData = await response.json();
      if (resData.error) {
        setError(resData.error);
      }

      if (response.status !== 400) {
        history.push(`/dashboard/?date=${formState.reservation_date}`);
        }
    }
  
    // currently, ErrorAlert will only display one error message at a time
    // with "Reservations must be place in the future" taking priority
    // needs to be set up so there multiple form valiations will result in multiple messages
    return (
        <div>
          {error ? <ErrorAlert errorMessage={errorMessage} /> : <></>}
          <form class="needs-validation center " onSubmit={submitHandler}>
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label htmlFor="first_name" className="mr-2">First Name</label>
                <input
                  required
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formState.first_name}
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
                  value={formState.last_name}
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
                  value={formState.mobile_number}
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
                  value={formState.reservation_date}
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
                  value={formState.reservation_time}
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
                  value={formState.people}
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

export default Edit;