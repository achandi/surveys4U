import React, { useState, useCallback, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Payments from "../page/payments";

import {
  FaGoogle,
  FaCoins,
  FaHome,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";

const Header = (props) => {
  console.log("header");
  console.log(props);
  const [isActive, setisActive] = useState(false);
  return (
    <nav
      className="navbar is-info is-bold is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <NavLink
            to={props.userDetails ? "/surveys" : "/"}
            className="button is-warning"
          >
            <span className="icon is-small is-focused">
              <FaHome size="16px" />
            </span>
            <span>Emaily</span>
          </NavLink>
        </div>
        <div className="navbar-item">
          <span className="button is-static">
            <span className="icon is-small  has-text-warning">
              <FaCoins size="16px" />
            </span>
            <span className="has-text-black">Balance: </span>
            <span className="has-text-black">{props.credits}</span>
          </span>
        </div>
        <a
          role="button"
          onClick={() => {
            setisActive(!isActive);
          }}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">{props.children}</div>
      </div>
    </nav>
  );
};

// const mapStatetoProps = (state) => ({ test: state.auth });
// const mapDispatchToProps = (dispatch) => {
//   return {
//     authCheckState: () => dispatch(checkAuth()),
//   };
// };

// export default connect(mapStatetoProps, mapDispatchToProps);

export default Header;
