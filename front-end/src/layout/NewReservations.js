import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReservationForm from "./ReservationForm";

const { REACT_APP_API_BASE_URL } = process.env;

function NewReservations() {
  const history = useHistory();

  // Initial values we want to fill within our formState useState()
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

  // This useEffect runs only if there is an error
  useEffect(() => {
    const abortController = new AbortController();
    setError(error);
    return () => abortController.abort();
  }, [error]);

  // If the value that is being changed is 'people', that field may only be a number.
  const changeHandler = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  };

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  // create a reservation!
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: formState }),
    });
    const resData = await response.json();

    if (resData.error) {
      setError(resData.error);
    }
    // re-sets our initial form state & takes us to the dashboard page of the reservation date
    if (response.status !== 400) {
      setFormState({ ...initialFormState });
      history.push(`/dashboard/?date=${resData.data.reservation_date}`);
    }
  };

  return (
    <div>
      {/* (NewReservations.js & Edit.js same the same form component) */}
      <ReservationForm
        reservationData={formState}
        setReservationData={setFormState}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        error={error}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default NewReservations;
