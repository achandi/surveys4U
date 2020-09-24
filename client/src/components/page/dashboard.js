import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "../survey/surveyList/surveyList";

// import axios from 'axios';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import { FaPlusCircle, FaTimes } from "react-icons/fa";
const Dashboard = (props) => {
  return (
    <div className="section">
      <div className="container">
        <div className="title ">
          <Link to="/surveys/new">
            <span className="icon has-shadow">
              <p className="mr-1">New Survey </p> <FaPlusCircle />
            </span>
          </Link>
        </div>
      </div>
      <div className="columns ">
        <div className="column box">
          <SurveyList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
