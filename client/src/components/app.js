import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Landing from "./page/landing";
import Dashboard from "./page/dashboard";
import NewSurvey from "./page/newSurvey";
import Header from "./UI/header";
import { IconContext } from "react-icons";
import { checkAuth } from "../store/actions/user";
import Payments from "./page/payments";

import { FaGoogle, FaCreditCard, FaSignOutAlt } from "react-icons/fa";

const authElement =
  //  useCallback(
  (userDetails) => {
    console.log(userDetails);
    console.log("authelement");
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
          <>
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
              {/* <Redirect exact from="/" to="/surveys" /> */}
            </div>
          </>
        );
    }
  };

const App = (props) => {
  const dispatch = useDispatch();
  const authCheckState = useCallback(
    () => dispatch(checkAuth()),

    [dispatch]
  );

  const userDetails = useSelector(({ user }) => user);
  // const count = useSelector(({ user }) => (user ? user.credit : 0));
  const [loading, isLoading] = useState(true);
  console.log("app");
  useEffect(() => {
    if (userDetails === null) {
      console.log(userDetails);
      authCheckState();
    } else {
      isLoading(false);
    }
  }, [authCheckState, userDetails]);
  return (
    <BrowserRouter>
      <IconContext.Provider
        value={{ verticalAlign: "middle", className: "fas" }}
      >
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <Header credits={userDetails && userDetails.credits}>
              {!loading && authElement(userDetails)}
            </Header>
            <Route exact path="/" component={Landing}>
              {userDetails && <Redirect to="/surveys" />}
            </Route>
            {userDetails === false && <Redirect to="/" />}
            <Route exact path="/surveys/new" component={NewSurvey}></Route>
            <Route
              exact
              path="/surveys"
              component={() => <Dashboard />}
            ></Route>
          </>
        )}
      </IconContext.Provider>
    </BrowserRouter>
  );
};

export default App;
