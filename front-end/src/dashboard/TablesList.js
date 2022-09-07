import React from "react";

function TablesList({ table }) {
    const { table_name, capacity, is_free } = table;

    return (
        <div className="card mx-3">
        <div className="card-header">
          Table: {table_name}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Capacity: {capacity}</li>
          <li className="list-group-item" id={`data-table-id-status=${table.table_id}`}>Status: {is_free ? "Free" : "Occupied"}</li>
        </ul>
        {is_free === "Occupied" ? <button type="button" className="btn btn-primary">Finish</button> : <></>}
      </div>
    )
}

export default TablesList;