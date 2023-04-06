import React from "react";

import "./TablesList.css"


const { REACT_APP_API_BASE_URL } = process.env;

function TablesList({ table, loadDashboard }) {
  // deconstructing needed values from table
    const { table_name, capacity, reservation_id, table_id } = table;
    
    // frees an existing table to be able to seat new guests 
    const onSubmitHandler = async (e) => {
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            const response = await fetch(`${REACT_APP_API_BASE_URL}/tables/${table_id}/seat`, {
                method: "DELETE", // Remember, delete here was specified in the backend to *update a table's status column.
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({data: {}}),
              });
              if (response.status !== 400) {
                loadDashboard()
              } else {
                console.log("there was an error")
                console.log(response.status)
              }
        }
      }

      // renders all tables
    return (
        <div className="tables-list container">
          {/* <div className="home__content"> */}
        <div className="card_img">
          <img src="https://user-images.githubusercontent.com/104235709/198115095-b7d574ba-f876-4a3e-8a73-93dbdee749b8.png" alt="PTLogo"/>
        </div>
        <div className="second-background-color mb-3">
          Table {table_name}
        </div>
        <ul className="list-group">
          <li className=" second-background-color">Capacity: {capacity}</li>
          <li className="third-background-color" data-table-id-status={table.table_id}>{!reservation_id ? "Free" : "occupied"}</li>
        </ul>
        <div>
        {reservation_id ? <button type="button" onClick={onSubmitHandler} className="btn today__button" data-table-id-finish={table.table_id}>Finish</button> : <></>}
        </div>
        </div>
  )
}

export default TablesList;