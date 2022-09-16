import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "./ErrorAlert";
import "./NewReservation.css";
import ReservationForm from "./ReservationForm";

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
          {error ? <ErrorAlert errorMessage={setErrorMessage(errorMessage)} /> : <></>}
        <ReservationForm 
        reservationData={formState}
        setReservationData={setFormState}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        errorMessage={errorMessage}
        error={error}
        changeHandler={changeHandler}
        />  
        </div>
    );
  }

export default Edit;