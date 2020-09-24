import React from 'react'
import { Link, withRouter } from 'react-router'
import { FaTimes, FaCheck, FaEnvelope } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import formFields from './formFields'
import { surveyPost } from '../../store/actions/surveys'

const SurveyReview = ({ onCancel, history }) => {
  const formValues = useSelector(({ form }) => form.surveyForm.values)
  const dispatch = useDispatch()
  const postForm = (values) => dispatch(surveyPost(values, history))
  console.log(formValues)
  const reviewFields = formFields.map(({ name, label }) => (
    <tr key={name}>
      <th>{label}</th>
      <td style={{ overflowWrap: 'anywhere' }}>{formValues[name]}</td>
    </tr>
  ))
  return (
    <div className="box" style={{ height: '75vh', overflowY: 'scroll' }}>
      <h5 className="title"> Please confirm your entries </h5>
      <table className="table is-fullwidth is">
        <tbody>{reviewFields}</tbody>
      </table>
      <button
        onClick={onCancel}
        className="button is-pulled-left is-danger is-bold"
      >
        <span className="icon">
          <FaTimes />
        </span>
      
        <span>Change</span>
      </button>
      <button
        onClick={() => postForm(formValues)}
        className="button is-pulled-right is-success is-bold"
      >
        <span className="icon">
          <FaEnvelope />
        </span>
        <span>Send Survey</span>
      </button>
    </div>
  )
}

export default withRouter(SurveyReview)
