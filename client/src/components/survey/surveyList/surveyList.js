import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSurveys } from "../../../store/actions/surveys";
import { FaCheck, FaTimes } from "react-icons/fa";
const SurveyList = ({ onCancel, history }) => {
  const formValues = useSelector(({ surveys }) => surveys);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  console.log(formValues);

  return (
    <div>
      {formValues &&
        formValues
          .reverse()
          .map(({ _id, yes, no, title, subject, dateSent }) => {
            return (
              <section key={_id} className="section">
                <div className="container">
                  <div className="card">
                    <div className="card-content">
                      <div className="columns is-mobile">
                        <div className="column is-two-is-two-thirds">
                          <div className="title">Title: {title}</div>

                          <div className="subtitle is-small">
                            Subject: {subject}
                          </div>

                          <span className="is-size-5 is-size-3-desktop has-text-info">
                            Date Sent: {new Date(dateSent).toDateString()}
                          </span>
                        </div>
                        <div className="column is-one-third">
                          <div className="is-pulled-right">
                            <span className="icon is-bold is-size-5 is-size-3-desktop has-text-info">
                              Response
                            </span>
                            <span className="icon is-size-5 is-size-3-desktop has-text-success">
                              <span>
                                Yes: {yes} <FaCheck />
                              </span>
                            </span>
                            <span className="icon has-text-danger is-size-3-desktop is-size-5">
                              <span>
                                No: {no} <FaTimes />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
    </div>
  );
};

export default SurveyList;
