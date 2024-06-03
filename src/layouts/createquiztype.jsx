import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./createquiztype.css";
import Buttongroup from "../components/buttongroup";
import { formatDate } from "../utils/formatdate";

function Createquiztype({ quizName, quizType, setPublishQuizActive, setUrl, setCreateQuizActive }) {
  const [timer, setTimer] = useState("off");
  const [optionType, setOptionType] = useState("");
  const [questions, setQuestions] = useState([
    {
      question_name: "",
      options: [{ text: "", imgUrl: "" }],
      correct_option: -1,
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [error, setError] = useState("");

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
    setOptionType(value);
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

  const handleCreateQuiz = () => {
    // Validation
    if (!questions[0].question_name) {
      setError("Each question must have a question text.");
      return;
    }
    if (!optionType) {
      setError("You must choose an option type.");
      return;
    }


    for (const question of questions) {
      if (question.options.length < 2) {
        setError("Each question must have at least 2 options.");
        return;
      }
      if (question.correct_option === -1 && quizType === "qna") {
        setError("Each question must have a correct option selected.");
        return;
      }
    }

    setError(""); // Clear any previous error
    const durationMapping = { off: 0, "5s": 5, "10s": 10 };
    let duration = durationMapping[timer];
    let correct_option = -1;

    if (quizType === "poll") {
      duration = 0;
      correct_option = -1;
    }

    const combinedType = `${quizType}-${
      optionType === "text-image" ? "textimage" : optionType
    }`;

    const updatedPostBody = {
      title: quizName,
      duration: duration,
      total_questions: questions.length,
      date: formatDate(new Date()),
      quizType: combinedType,
      questions: questions.map((q) => ({
        ...q,
        options: q.options.map((opt) => ({
          text: opt.text,
          imgUrl: opt.imgUrl,
        })),
        correct_option: quizType === "qna" ? q.correct_option : -1,
      })),
    };

    // Make API call to create the quiz
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://quizapp-backend-yctp.onrender.com/quiz/create-quiz", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPostBody),
      })
        .then((response) => response.json())
        .then((data) => {
          
          console.log("Quiz created successfully:", data.id);
          setPublishQuizActive(true);
          setUrl(data.id);
          setCreateQuizActive(false);
          // Navigate to another page or show success message
        })
        .catch((error) => {
          console.error("Error creating quiz:", error);
        });
    } else {
      console.error("Token not found in localStorage");
    }
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
              {i > 0 && (
                <RxCross2
                  className="closebtn"
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
            className="addquestionbtn"
          >
            +
          </button>
        </div>
        <div className="option-type">
          <div className="optionTypes">Option Type</div>
          <div className="mainoptions">
            <label className="text">
              <input
                className="radiobutton"
                type="radio"
                name={`type`}
                value="text"
                checked={optionType === "text"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={optionType !== "" && optionType !== "text"}
              />
              Text
            </label>
            <label className="image">
              <input
                type="radio"
                name={`type`}
                value="image"
                checked={optionType === "image"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={optionType !== "" && optionType !== "image"}
              />
              Image URL
            </label>
            <label className="textimage">
              <input
                type="radio"
                name={`type`}
                value="text-image"
                checked={optionType === "text-image"}
                onChange={(e) => handleOptionTypeChange(e.target.value)}
                disabled={optionType !== "" && optionType !== "text-image"}
              />
              Text & Image URL
            </label>
          </div>
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
                    value={q.question_name}
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
                  />
                </div>
                <div className="options-timer">
                  <div className="options">
                    {q.options.map((opt, j) => (
                      <div
                        key={j}
                        className={`option ${
                          q.correct_option === j ? "correct" : ""
                        }`}
                        style={{
                          backgroundColor:
                            q.correct_option === j ? "green" : "transparent",
                          color: q.correct_option === j ? "white" : "black",
                        }}
                      >
                        {quizType === "qna" && (
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
                        {optionType === "text" && (
                          <input
                            type="text"
                            className="optioninputtext"
                            value={opt.text}
                            placeholder="Text"
                            onChange={(e) =>
                              handleOptionChange(i, j, e.target.value, "text")
                            }
                          />
                        )}
                        {optionType === "image" && (
                          <input
                            type="text"
                            className="optioninputtext"
                            value={opt.imgUrl}
                            placeholder="Image URL"
                            onChange={(e) =>
                              handleOptionChange(i, j, e.target.value, "imgUrl")
                            }
                          />
                        )}
                        {optionType === "text-image" && (
                          <>
                            <input
                              type="text"
                              className="optioninputtext"
                              value={opt.text}
                              placeholder="Text"
                              onChange={(e) =>
                                handleOptionChange(i, j, e.target.value, "text")
                              }
                            />
                            <input
                              type="text"
                              className="optioninputtext"
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
                            className="delete-button"
                            onClick={() => handleRemoveOption(i, j)}
                          >
                            <img src="assets/delete.svg" alt="Delete" />
                          </div>
                        )}
                      </div>
                    ))}
                    {q.options.length < 4 && (
                      <button
                        className="add-option-button"
                        onClick={() => handleAddOption(i)}
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                  {quizType === "qna" && (
                    <div className="timer-settings">
                      <div className="timer">Timer</div>
                      <label
                        className="offdiv"
                        style={{
                          backgroundColor: timer === "off" ? "red" : "white",
                          color: timer === "off" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("off")}
                      >
                        <div className="off">Off</div>
                      </label>
                      <label
                        className="fiveseconddiv"
                        style={{
                          backgroundColor: timer === "5s" ? "red" : "white",
                          color: timer === "5s" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("5s")}
                      >
                        <div className="fivesecond">5 sec</div>
                      </label>
                      <label
                        className="tenseconddiv"
                        style={{
                          backgroundColor: timer === "10s" ? "red" : "white",
                          color: timer === "10s" ? "white" : "#9f9f9f",
                        }}
                        onClick={() => handleTimerChange("10s")}
                      >
                        <div className="tensecond">10 sec</div>
                      </label>
                    </div>
                  )}
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="quiz-buttons-type">
                  <Buttongroup
                    text={"Cancel"}
                    color="#fff"
                    textColor="#474444"
                    onClick={() => {window.location.reload();}}
                  >
                    Cancel
                  </Buttongroup>
                  <Buttongroup
                    text={"Create Quiz"}
                    color="#60B84B"
                    textColor="#fff"
                    onClick={handleCreateQuiz}
                  >
                    Create Quiz
                  </Buttongroup>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Createquiztype;









