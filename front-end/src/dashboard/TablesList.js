import React from "react";

import "./TablesList.css"


const { REACT_APP_API_BASE_URL } = process.env;

function TablesList({ table, loadDashboard }) {
    const { table_name, capacity, reservation_id, table_id } = table;
    

    const onSubmitHandler = async (e) => {
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            const response = await fetch(`${REACT_APP_API_BASE_URL}/tables/${table_id}/seat`, {
                method: "DELETE",
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

    return (
        <div className="tables-list card-circle" >
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
        {reservation_id ? <button type="button" onClick={onSubmitHandler} className="btn btn-secondary mt-4 colorfulBtnTwo" data-table-id-finish={table.table_id}>Finish</button> : <></>}
      </div>
  )
}

export default TablesList;