import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import "./TableForm.css";

const { REACT_APP_API_BASE_URL } = process.env;

function TableForm() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(undefined);

  // manipulates our formState values in order to create a new table
  const changeHandler = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  // create a new table 
  const submitHandler = async (e) => {
    e.preventDefault();
    formState.capacity = Number(formState.capacity);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/tables`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({data: formState}),
    });
    const resData = await response.json();
    console.log(resData)
    if (resData.error) {
      setError(resData.error);
    }
  
    if (response.status !== 400) {
      setFormState({ ...initialFormState });
      history.push(`/dashboard`);
    }
    
  };

  return (
    <div className="table__form">
    {error ? <ErrorAlert errorMessage={error}/> : <></>}
    <div className="form-group center">
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name" className="field">Table Name</label>
        <input
          required
          type="text"
          id="table_name"
          name="table_name"
          title="Table names must be at least 2 characters long."
          value={formState.table_name}
          onChange={changeHandler}
          className="mr-2 background-color mb-4"
        ></input>
        <label htmlFor="capacity" className="field">Table Capacity</label>
        <input          
          type="number"
          id="capacity"
          name="capacity"
          value={formState.capacity}
          onChange={changeHandler}
          className="mr-2 background-color mb-4"
        ></input>
        <br />
        <button
          type="button"
          name="cancel-btn"
          onClick={cancelHandler}
          className="btn res__button mt-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          name="submit-btn"
          className="btn res__button mt-3"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default TableForm;