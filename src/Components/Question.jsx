// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import '../Components/Question.css';

export default function Question({ question, editQuestion, deleteQuestion }) {
  return (
    <div className="card" key={question.id} style={{ border: '1px solid black' }}>
      <div className="m-3">
        <p><b>Question: </b>{question.questionText}</p>
        <p><b>Options: </b></p>
        <ul>
          {question.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <p><b>Correct Answer: </b>{question.correctAnswer}</p>
        <div className="text-center m-3 p-2">
          <button className="btn me-2 btn-warning" onClick={() => editQuestion(question.id)} type="button">
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => deleteQuestion(question.id)} type="button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
  }).isRequired,
  editQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};
