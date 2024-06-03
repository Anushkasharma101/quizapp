import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import "./editpage.css";
import Buttongroup from "../components/buttongroup";

function Editpage({ quizId }) {
  console.log("quizId:", quizId);
  const [timer, setTimer] = useState("off");
  const [quizType, setQuizType] = useState("");
  const [optionType, setOptionType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`https://quizapp-backend-yctp.onrender.com/quiz/${quizId}`);
        const data = await response.json();
        console.log(data);
        setQuestions(data.questions);
        // const [optionType, quizType] = data.quiz.quizType.split('-');
        // setOptionType(optionType);
        // setQuizType(quizType);
        setQuizType(data.quiz.quizType.split('-')[1]);
        setOptionType(data.quiz.quizType.split('-')[0]);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }

      ;
    };

    fetchQuizData();
  }, [quizId]);


  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        {
          question_name: "",
          options: [{ text: "", imgUrl: "" }],
          correct_option: -1,
        },
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
      i === index ? { ...q, question_name: value } : q
    );
    setQuestions(newQuestions);
  };

  const handleOptionTypeChange = (value) => {
    setQuizType(value);
    const newQuestions = questions.map((q) => ({
      ...q,
      options: q.options.map((opt) => ({
        ...opt,
        text: value === "image" ? "" : opt.text,
        imgUrl: value === "text" ? "" : opt.imgUrl,
      })),
    }));
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = questions.map((q, i) =>
      i === index
        ? { ...q, options: [...q.options, { text: "", imgUrl: "" }] }
        : q
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

  const handleOptionChange = (qIndex, oIndex, value, field = "text") => {
    const newQuestions = questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            options: q.options.map((opt, j) =>
              j === oIndex ? { ...opt, [field]: value } : opt
            ),
          }
        : q
    );
    setQuestions(newQuestions);
  };

  const handleTimerChange = (value) => {
    setTimer(value);
  };

  const handleQuestionSelect = (index) => {
    setActiveQuestion(index);
  };

  const handleCorrectOptionSelect = (qIndex, oIndex) => {
    const newQuestions = questions.map((q, i) =>
      i === qIndex
        ? { ...q, correct_option: quizType === "qna" ? oIndex : null }
        : q
    );
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = () => {
    // Prepare question updates
    const questionUpdates = questions.map((q) => ({
      question_name: q.question_name,
      options: q.options,
      polls: [],
      correct_option: q.correct_option,
    }));

    // Make API call to update the quiz
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://quizapp-backend-yctp.onrender.com/quiz/update/${quizId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionUpdates }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Quiz updated successfully:", data);
          window.location.reload()
          // Navigate to another page or show success message
        })
        .catch((error) => {
          console.error("Error updating quiz:", error);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  };

  return (
    <div className="create-quiz-modal-edit">
      <div className="create-quiz-edit">
        <div className="question-selector-edit">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`question-number-container-edit ${
                i === activeQuestion ? "active" : ""
              }`}
              onClick={() => handleQuestionSelect(i)}
            >
              <button className="question-number-edit">{i + 1}</button>
              {i > 0 && (
                <RxCross2
                  className="closebtn-edit"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleRemoveQuestion(i);
                  }}
                  style={{
                    cursor: "pointer",
                    color: questions.length <= 1 ? "black" : "inherit",
                  }}
                  disabled={questions.length <= 1}
                />
              )}
            </div>
          ))}
          <button
            onClick={handleAddQuestion}
            disabled={questions.length >= 5}
            className="addquestionbtn-edit"
          >
            +
          </button>
        </div>
        <div className="option-type-edit">
          <div className="optionTypes-edit">Option Type</div>
          <div className="mainoptions-edit">
            <label className="text-edit">
              <input
                className="radiobutton-edit"
                type="radio"
                name={`type`}
                value="text"
                checked={quizType === "text"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={quizType !== "" && quizType !== "text"}
              />
              Text
            </label>
            <label className="image-edit">
              <input
                type="radio"
                name={`type`}
                value="image"
                checked={quizType === "image"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={quizType !== "" && quizType !== "image"}
              />
              Image URL
            </label>
            <label className="textimage-edit">
              <input
                type="radio"
                name={`type`}
                value="text-image"
                checked={quizType === "text-image"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={quizType !== "" && quizType !== "text-image"}
              />
              Text & Image URL
            </label>
          </div>
        </div>
        {questions.map(
          (q, i) =>
            i === activeQuestion && (
              <div key={i} className="question-block-edit">
                <div className="inputquestiondiv-edit">
                  <input
                    className="inputquestion-edit"
                    type="text"
                    placeholder="QnA Question"
                    value={q.question_name}
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
                  />
                </div>
                <div className="options-timer-edit">
                  <div className="options-edit">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className={`option-edit ${
                          q.correct_option === j ? "correct" : ""
                        }`}
                        style={{
                          backgroundColor:
                            q.correct_option === j ? "green" : "transparent",
                          color: q.correct_option === j ? "white" : "black",
                        }}
                      >
                        {optionType === "qna" && (
                          <input
                            type="radio"
                            name={`correct-option-${i}`}
                            checked={q.correct_option === j}
                            onChange={() => handleCorrectOptionSelect(i, j)}
                            style={{
                              backgroundColor:
                                q.correct_option === j ? "green" : "white",
                            }}
                          />
                        )}
                        {quizType === "text" && (
                          <input
                            type="text"
                            className="optioninputtext-edit"
                            value={opt.text}
                            placeholder="Text"
                            onChange={(e) =>
                              handleOptionChange(i, j, e.target.value, "text")
                            }
                          />
                        )}
                        {quizType === "image" && (
                          <input
                            type="text"
                            className="optioninputtext-edit"
                            value={opt.imgUrl}
                            placeholder="Image URL"
                            onChange={(e) =>
                              handleOptionChange(i, j, e.target.value, "imgUrl")
                            }
                          />
                        )}
                        {quizType === "text-image" && (
                          <>
                            <input
                              type="text"
                              className="optioninputtext-edit"
                              value={opt.text}
                              placeholder="Text"
                              onChange={(e) =>
                                handleOptionChange(i, j, e.target.value, "text")
                              }
                            />
                            <input
                              type="text"
                              className="optioninputtext-edit"
                              value={opt.imgUrl}
                              placeholder="Image URL"
                              onChange={(e) =>
                                handleOptionChange(
                                  i,
                                  j,
                                  e.target.value,
                                  "imgUrl"
                                )
                              }
                            />
                          </>
                        )}
                        {j >= 2 && (
                          <div
                            className="delete-button-edit"
                            onClick={() => handleRemoveOption(i, j)}
                          >
                            <img src="assets/delete.svg" alt="Delete" />
                          </div>
                        )}
                      </div>
                    ))}
                    {q.options.length < 4 && (
                      <button
                        className="add-option-button-edit"
                        onClick={() => handleAddOption(i)}
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                  {optionType === "qna" && (
                    <div className="timer-settings-edit">
                      <div className="timer-edit">Timer</div>
                      <label
                        className="offdiv-edit"
                        style={{
                          backgroundColor: timer === "off" ? "red" : "white",
                          color: timer === "off" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("off")}
                      >
                        <div className="off-edit">Off</div>
                      </label>
                      <label
                        className="fiveseconddiv-edit"
                        style={{
                          backgroundColor: timer === "5s" ? "red" : "white",
                          color: timer === "5s" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("5s")}
                      >
                        <div className="fivesecond-edit">5 sec</div>
                      </label>
                      <label
                        className="tenseconddiv-edit"
                        style={{
                          backgroundColor: timer === "10s" ? "red" : "white",
                          color: timer === "10s" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("10s")}
                      >
                        <div className="tensecond-edit">10 sec</div>
                      </label>
                    </div>
                  )}
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="quiz-buttons-type-edit">
                  <Buttongroup
                    text={"Cancel"}
                    color="#fff"
                    textColor="#474444"
                    onClick={() => {window.location.reload()}}
                  >
                    Cancel
                  </Buttongroup>
                  <Buttongroup
                    text={"Update Quiz"}
                    color="#60B84B"
                    textColor="#fff"
                    onClick={handleCreateQuiz}
                  >
                    Update Quiz
                  </Buttongroup>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Editpage;

