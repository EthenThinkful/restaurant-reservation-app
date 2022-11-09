import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservations from "./NewReservations";
import TableForm from "../tables/TableForm";
import SeatTableForm from "../tables/SeatTableForm";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import  Search  from "./Search";
import Edit from "./Edit"
import "./Routes.css"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <div className="img">
    <Switch>
      {/* base path */}
    <Route exact path="/">
      <Redirect to={"/dashboard"} />
    </Route>
    {/* dashboard contains reservation data */}
    <Route exact path="/reservations">
      <Redirect to={"/dashboard"} />
    </Route>
    {/* path to seat any specific reservation */}
    <Route path="/reservations/:reservation_id/seat"> 
      <SeatTableForm />
    </Route>
    {/* dashboard contains table data */}
    <Route exact path="/tables">
      <Redirect to={"/dashboard"} />
    </Route>
    {/* path to create a new table */}
    <Route path="/tables/new">
      <TableForm />
    </Route>
    {/* path to create a new reservation */}
    <Route exact path="/reservations/new">
      <NewReservations />
    </Route>
    {/* dashboard path renders current date */}
    <Route path="/dashboard">
      <Dashboard date={today()} />
    </Route>
    {/* path to search a reservation by phone number */}
    <Route path="/search">
      <Search />
    </Route>
    {/* path to edit any specific reservation */}
    <Route path="/reservations/:reservation_id/edit">
      <Edit />
    </Route>
    {/* edge case error path for any unspecified route */}
    <Route>
      <NotFound />
    </Route>
  </Switch>
  </div>
  );
}

export default Routes;
