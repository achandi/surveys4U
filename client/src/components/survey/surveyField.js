import React from 'react'
const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" {...input} />
        <div className="has-text-danger">{touched && error}</div>
      </div>
    </div>
  )
}

export default SurveyField
