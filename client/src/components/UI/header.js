import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions/user';
import Payments from '../page/payments';

import {
  FaGoogle,
  FaCoins,
  FaHome,
  FaCreditCard,
  FaSignOutAlt,
} from 'react-icons/fa';
const authElement =
  //  useCallback(
  (userDetails) => {
    console.log(userDetails);
    switch (userDetails) {
      case null:
        return;
      case false:
        return (
          <div className="navbar-item">
            <a className="button is-danger" href="/auth/google">
              <span className="icon is-small">
                <FaGoogle size="16px" />
              </span>
              <span>Login with google</span>
            </a>
          </div>
        );
      default:
        return (
          <React.Fragment>
            <div className="navbar-item">
              <Payments>
                <button className="button is-warning">
                  <span className="icon is-small">
                    <FaCreditCard size="16px" />
                  </span>
                  <span>Add Credit</span>
                </button>
              </Payments>
            </div>
            <div className="navbar-item">
              <a className="button is-danger" href="/api/logout">
                <span className="icon is-danger is-small">
                  <FaSignOutAlt size="16px" />
                </span>
                <span>Logout</span>
              </a>
              <Redirect exact from="/" to="/surveys" />
            </div>
          </React.Fragment>
        );
    }
  };

const Header = (props) => {
  const [isActive, setisActive] = useState(false);
  const dispatch = useDispatch();
  const authCheckState = useCallback(
    () => dispatch(checkAuth()),

    [dispatch]
  );

  const userDetails = useSelector(({ user }) => user);

  useEffect(() => {
    // if (!props.test.auth) {
    if (userDetails === null) {
      authCheckState();
    }
    // }
  }, [authCheckState, userDetails]);
  // useEffect(() => {
  //   // if (!props.test.auth) {
  //   if (userDetails === null) {
  //     authCheckState();
  //   }
  //   // }
  // }, [authCheckState, userDetails]);

  //   [userDetails]
  // );

  return (
    <nav
      className="navbar is-primary is-bold is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <NavLink
            to={userDetails ? '/surveys' : '/'}
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
            <span className="box has-text-black">
              {userDetails && userDetails.credits}
            </span>
          </span>
        </div>
        <a
          role="button"
          onClick={() => {
            setisActive(!isActive);
          }}
          className={`navbar-burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-end">{authElement(userDetails)}</div>
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
