import React from 'react'
// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './surveyField'
import { FaTimes, FaCheck } from 'react-icons/fa'
import validateEmails from '../utils/validateEmails.js'
import formFields from './formFields'
const SurveyForm = (props) => {
  const renderFields = () => {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        type="text"
        name={name}
        label={label}
        component={SurveyField}
      />
    ))
  }
  return (
    <div className="box" style={{ height: '75vh' }}>
      <form
        className="box"
        style={{ overflowY: 'scroll' }}
        onSubmit={props.handleSubmit(props.onSurveySubmit)}
      >
        {renderFields()}
        <div className="field" style={{ height: '5vh' }}>
          <span className="is-pulled-left">
            <Link to="/surveys">
              <button className="button is-pulled-left is-danger is-bold">
                <span className="icon">
                  <FaTimes />
                </span>
                <span>Cancel</span>
              </button>
            </Link>
          </span>
          <span className="is-pulled-right">
            <button
              type="submit"
              className="button is-pulled-right is-success is-bold"
            >
              <span className="icon">
                <FaCheck />
              </span>
              <span>Review</span>
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}

const validate = (values) => {
  const errors = {}
  //if u put line after the for EAch, every form will show email is invalid statement
  errors.recipients = validateEmails(values.recipients || '')
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  })
  return errors
}

export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
})(SurveyForm)

// {/* <div className="field">
//           <label className="label">Email</label>
//           <div className="control has-icons-left">
//             <Field type="text" name="surveyTitle" component={SurveyField} />

//             <span className="icon is-small is-left">
//               <i className="fa fa-envelope"></i>
//             </span>
//           </div>
