import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../dashboard/ReservationsList";
// import { formatAsTime } from "../utils/date-time";

const { REACT_APP_API_BASE_URL } = process.env;

function Search() {
  const history = useHistory();

  const initialFormState = {
    mobile_number: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mobileData, setMobileData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    setErrorMessage(error);
    return () => abortController.abort();
  }, [error]);

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  function changeHandler({ target }) {
    setFormState({ ...formState, mobile_number: target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("FORM STATE", formState);
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/reservations?mobile_number=${formState.mobile_number}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        //   body: JSON.stringify({data: formState}),
      }
    );
    const resData = await response.json();
    console.log("RESDATA", resData);
    setMobileData(resData);
    if (resData.error) {
      setError(resData.error);
    }
    // if (response.status !== 400) {
    //   setFormState({ ...initialFormState });
    //   history.push(`/dashboard/?date=${resData.data.reservation_date}`);
    // }
  };
  console.log("MOBILE ZATA", mobileData)
//   let matchedCards = mobileData.length ? (
//     console.log("LINE 62", mobileData),
//     mobileData.map((reservation, index) => {
//     console.log("LOINE 64", reservation.reservation_id)
//     return (
//     <ReservationList
//       key={index}
//       reservation={reservation}
//       formatTime={formatAsTime}
//     />
//     )
// })) : (console.log("haha"))

  return (
    <div>
      {error ? <ErrorAlert errorMessage={errorMessage} /> : <></>}
      <div className="form-group">
        <form onSubmit={submitHandler}>
          <label htmlFor="mobile_number">Reservation Contact Number</label>
          <input
            required
            type="text"
            id="mobile_number"
            name="mobile_number"
            placeholder="xxx-xxx-xxxx"
            value={formState.mobile_number}
            onChange={changeHandler}
          ></input>
          <br />
          <button
            type="button"
            name="cancel-btn"
            onClick={cancelHandler}
            className="btn btn-primary"
          >
            Cancel
          </button>
          <button type="submit" name="submit-btn" className="btn btn-secondary">
            Find
          </button>
        </form>
        <ReservationList
      key={mobileData.reservation_id}
      reservation={mobileData}
    //   formatTime={formatAsTime}
    />
        {/* {mobileData ? (
          <div>
            {matchedCards}
          </div>
        ) : "No reservations found"} */}
      </div>
    </div>
  );
}

export default Search;
