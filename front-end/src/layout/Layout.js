import React from "react";
import Routes from "./Routes";
import Navbar from "./navbar";


/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */


function Layout() {
  return (
    <>
        <Navbar />
        <div className="main">
        <Routes />
        </div>
    </>
  );
}

export default Layout;
