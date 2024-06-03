import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./createpolltype.css";
import Buttongroup from "../components/buttongroup";

function CreatePoll() {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], type: "text" },
  ]);
  const [timer, setTimer] = useState("off");
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        { text: "", options: ["", ""], type: "text" },
      ]);
      setActiveQuestion(questions.length);
    }
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setActiveQuestion(Math.max(0, activeQuestion - 1));
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, text: value } : q
    );
    setQuestions(newQuestions);
  };

  const handleOptionTypeChange = (index, value) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, type: value } : q
    );
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? { ...q, options: [...q.options, ""] } : q
    );
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const newQuestions = questions.map((q, i) =>
      i === qIndex
        ? { ...q, options: q.options.filter((_, j) => j !== oIndex) }
        : q
    );
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            options: q.options.map((opt, j) => (j === oIndex ? value : opt)),
          }
        : q
    );
    setQuestions(newQuestions);
  };

  const handleTimerChange = (value) => {
    setTimer(value);
  };

  const handleCreateQuiz = () => {
    console.log("Quiz Created:", questions, timer);
  };

  const handleQuestionSelect = (index) => {
    setActiveQuestion(index);
  };

  return (
    <div className="create-quiz-modal">
      <div className="create-quiz">
        <div className="question-selector">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`question-number-container ${
                i === activeQuestion ? "active" : ""
              }`}
              onClick={() => handleQuestionSelect(i)}
            >
              <button className="question-number">{i + 1}</button>
              <RxCross2
                className="closebtn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  handleRemoveQuestion(i);
                }}
                style={{
                  cursor: questions.length <= 1 ? "not-allowed" : "pointer",
                  color: questions.length <= 1 ? "black" : "inherit",
                }}
                disabled={questions.length <= 1}
              />
            </div>
          ))}
          <button
            onClick={handleAddQuestion}
            disabled={questions.length >= 5}
            className="addquestionbtn"
          >
            +
          </button>
        </div>
        {questions.map(
          (q, i) =>
            i === activeQuestion && (
              <div key={i} className="question-block">
                <div className="inputquestiondiv">
                  <input
                    className="inputquestion"
                    type="text"
                    placeholder="QnA Question"
                    value={q.text}
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
                  />
                </div>
                <div className="option-type">
                  <div className="optionTypes">Option Type</div>
                  <div className="mainoptions">
                    
                    
                    
                  </div>
                </div>
                <div className="options">
                  {/* <div className="uldiv">
                    <ul>
                      {q.options.map((opt, j) => (
                        <li key={j} className="option">
                          <input
                              type="text"
                              className="optioninputtext"
                              value={opt}
                              placeholder="Text"
                              onChange={(e) =>
                                handleOptionChange(i, j, e.target.value)
                              }
                            />
                          {j >= 2 && (
                            <button onClick={() => handleRemoveOption(i, j)}>
                              Delete
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    {q.options.length < 4 && (
                      <button onClick={() => handleAddOption(i)}>
                        Add Option
                      </button>
                    )}
                  </div> */}

                  <div className="uldiv">
                    <ul>
                      {q.options.map((opt, j) => (
                        <li key={j} className="option">
                          <input
                            type="text"
                            className="optioninputtext"
                            value={opt}
                            placeholder="Text"
                            onChange={(e) =>
                              handleOptionChange(i, j, e.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                    {q.options.length >= 3 && (
                      <div
                        className="delete-button"
                        onClick={() =>
                          handleRemoveOption(i, q.options.length - 1)
                        }
                      >
                        <img src="/assets/delete.svg" alt="Delete" />
                      </div>
                    )}
                    {q.options.length < 4 && (
                      <button
                        className="add-option-button"
                        onClick={() => handleAddOption(i)}
                      >
                        Add Option
                      </button>
                    )}
                  </div>

                  
                </div>
              </div>
            )
        )}

        <div className="quiz-buttons">
          <Buttongroup
            text={"Cancel"}
            color="#fff"
            textColor="#474444;
"
            onClick={() =>
              setQuestions([{ text: "", options: ["", ""], type: "text" }])
            }
          >
            Cancel
          </Buttongroup>
          <Buttongroup
            text={"Create Quiz"}
            color="#60B84B"
            textColor="#fff"
            onClick={handleCreateQuiz}
          ></Buttongroup>
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
