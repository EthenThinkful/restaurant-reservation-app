import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ReservationForm from "./ReservationForm";

const { REACT_APP_API_BASE_URL } = process.env;

function NewReservations() {
  const history = useHistory();

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

  useEffect(() => {
    const abortController = new AbortController();
    setError(error);
    return () => abortController.abort();
  }, [error]);

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
    // successful requests are currently doing nothing with the resData
    if (resData.error) {
      setError(resData.error);
    }
    if (response.status !== 400) {
      setFormState({ ...initialFormState });
      history.push(`/dashboard/?date=${resData.data.reservation_date}`);
    }
  };

  // currently, ErrorAlert will only display one error message at a time
  // with "Reservations must be place in the future" taking priority
  // needs to be set up so there multiple form valiations will result in multiple messages
  return (
    <div>
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
