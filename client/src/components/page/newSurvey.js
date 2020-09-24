import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

import SurveyForm from '../survey/surveyForm'
import SurveyFormReview from '../survey/surveyFormReview'

const NewSurvey = (props) => {
  const [formReview, formReviewUpdate] = useState(false)
  console.log(props)
  const renderContent = () => {
    if (formReview === true) {
      return <SurveyFormReview onCancel={() => formReviewUpdate(false)} />
    } else {
      return <SurveyForm onSurveySubmit={() => formReviewUpdate(true)} />
    }
  }
  return (
    <div style={{ height: '75vh' }} className="column">
      {renderContent()}
    </div>
  )
}

export default reduxForm({ form: 'surveyForm' })(NewSurvey)
