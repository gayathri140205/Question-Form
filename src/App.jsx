import './App.css';
import Question from './Components/Question';
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState('All');
  const [editMode, setEditMode] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = () => {
    if (questionText.trim() === '' || options.includes('') || !correctAnswer) {
      return;
    }

    if (editMode) {
      const updatedQuestions = questions.map((question) => {
        if (question.id === editQuestionId) {
          return { ...question, questionText, options, correctAnswer };
        }
        return question;
      });
      setQuestions(updatedQuestions);
      setEditMode(false);
      setEditQuestionId(null);
    } else {
      const newQuestion = {
        id: questions.length + 1,
        questionText,
        options,
        correctAnswer,
      };
      setQuestions([...questions, newQuestion]);
    }

    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const editQuestion = (id) => {
    const questionToEdit = questions.find((question) => question.id === id);
    if (questionToEdit) {
      setQuestionText(questionToEdit.questionText);
      setOptions(questionToEdit.options);
      setCorrectAnswer(questionToEdit.correctAnswer);
      setEditMode(true);
      setEditQuestionId(id);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <div className="text-center">
          <h1 id="title" className="text-white">Question Form Application</h1>
          <br />
          <form>
            <div className="form-group">
              <input
                className="form-control mb-1"
                type="text"
                placeholder="Question Text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
              {options.map((option, index) => (
                <input
                  key={index}
                  className="form-control mb-1"
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  required
                />
              ))}
              <select
                className="form-control mb-1"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="">Select Correct Answer</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <button onClick={addQuestion} className="glow-on-hover mb-3 mt-3">
                {editMode ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        {questions.map((question) => (
          <div key={question.id} className="card mb-3 p-3">
            <Question
              question={question}
              editQuestion={editQuestion}
              deleteQuestion={deleteQuestion}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
