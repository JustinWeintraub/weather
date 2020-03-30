import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg  navbar-light bg-dark"
        style={{ marginBottom: "10vh" }}
      >
        <div className="nav ml-auto mr-auto">
          <React.Fragment>
            <NavLink className="nav-item nav-link h3 text-primary" to="/">
              <div className="navButton">Temperatures</div>
            </NavLink>
            <NavLink
              className="nav-item nav-link h3 text-primary"
              to="/predict"
            >
              <div className="navButton">Predict</div>
            </NavLink>
          </React.Fragment>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
