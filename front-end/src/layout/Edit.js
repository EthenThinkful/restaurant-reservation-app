import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import './ReservationForm.css'
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
    const [error, setError] = useState(null);
  
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
          )
          const resData = await response.json()
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
      console.log("ERROR MESSAGE", resData.error)
      if (resData.error) {
        setError(resData.error);
      }

      if (response.status !== 400) {
        history.push(`/dashboard/?date=${formState.reservation_date}`);
        }
    }
    console.log("ERRORRRRR", error)
    
    return (
        <div>
        <ReservationForm 
        reservationData={formState}
        setReservationData={setFormState}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        changeHandler={changeHandler}
        error={error}
        />  
        </div>
    );
  }

export default Edit;