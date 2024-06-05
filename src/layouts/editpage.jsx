import React, { useEffect, useState } from "react";
import "./editpage.css";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import Buttongroup from "../components/buttongroup";

const TestingUpdate = ({ quizId }) => {
  const [createQuizData, setCreateQuizData] = useState([
    {
      _id: "",
      question_name: "",
      options: [
        { text: "", imgUrl: "" },
        { text: "", imgUrl: "" },
      ],
      polls: [],
      correct_option: -1,
    },
  ]);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizType, setQuizType] = useState(""); // Default quiz type
  const [duration, setDuration] = useState(0); // Default duration
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [isTypeSelected, setIsTypeSelected] = useState(false); // Flag for type selection
  const [typeSelected, setTypeSelected] = useState(0);
  const [quizMainType, setQuizMainType] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://quizapp-backend-yctp.onrender.com/quiz/${quizId}`
        );
        const data = await response.json();
        console.log(data);
        console.log(data);
        setCreateQuizData(data.questions);
        setQuizType(data.quiz.quizType.split("-")[1]);
        setIsTypeSelected(true);
        setDuration(data.quiz.duration);
        setTypeSelected(getTypeValue(data.quiz.quizType.split("-")[1]));
        setQuizMainType(data.quiz.quizType.split("-")[0]);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const getTypeValue = (type) => {
    switch (type) {
      case "text":
        return 0;
      case "image":
        return 1;
      case "text-image":
        return 2;
      default:
        return 0;
    }
  };

  const addQuestions = () => {
    if (createQuizData.length < 5) {
      let flag = 0;
      for (let i = 0; i < createQuizData[currentIndex].options.length; i++) {
        if (
          createQuizData[currentIndex].options[i].text === "" &&
          quizType === "text"
        ) {
          flag = 1;
          alert("Please fill text options!");
        } else if (
          createQuizData[currentIndex].options[i].imgUrl === "" &&
          quizType === "image"
        ) {
          flag = 1;
          alert("Please fill image URL options!");
        } else if (
          (createQuizData[currentIndex].options[i].imgUrl === "" ||
            createQuizData[currentIndex].options[i].text === "") &&
          quizType === "text-image"
        ) {
          flag = 1;
          alert("Please fill text and image URL options!");
        }
      }
      if (createQuizData[currentIndex].question_name === "") {
        alert("Enter question");
      } else if (
        createQuizData[currentIndex].correct_option === -1 &&
        quizType === "qna"
      ) {
        alert("Select correct option");
      } else if (flag === 0) {
        setCreateQuizData((prev) => [
          ...prev,
          {
            _id: "",
            question_name: "",
            options: [
              { text: "", imgUrl: "" },
              { text: "", imgUrl: "" },
            ],
            polls: [],
            correct_option: -1,
          },
        ]);

        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const deleteQuestion = (targetIndex) => {
    const newCreateQuizData = [...createQuizData];
    newCreateQuizData.splice(targetIndex, 1);
    setCreateQuizData(newCreateQuizData);
  };

  const deleteOption = (targetIndex) => {
    if (createQuizData[currentIndex].correct_option === targetIndex) {
      alert("please don't this option as this is marked as correct option");
    } else {
      const newOptions = [...createQuizData[currentIndex].options];
      newOptions.splice(targetIndex, 1);
      setCreateQuizData((prevData) => {
        const updatedData = [...prevData];
        updatedData[currentIndex] = {
          ...updatedData[currentIndex],
          options: newOptions,
        };
        return updatedData;
      });
    }
  };

  const addOption = () => {
    if (createQuizData[currentIndex].options.length < 4) {
      setCreateQuizData((prevData) => {
        const updatedData = [...prevData];
        updatedData[currentIndex] = {
          ...updatedData[currentIndex],
          options: [
            ...updatedData[currentIndex].options,
            { text: "", imgUrl: "" },
          ],
        };
        return updatedData;
      });
    }
  };

  const handleTypeSelection = (type, val) => {
    if (!isTypeSelected) {
      // Ensure type can only be selected once
      setQuizType(type);
      setTypeSelected(val);
      setIsTypeSelected(true); // Disable further type changes
    }
  };

  const handleDotClick = (index) => {
    setCreateQuizData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentIndex].correct_option = index;
      return updatedData;
    });
  };

  const handleTimerSelection = (newDuration) => {
    // setDuration(newDuration); // Update duration state
  };

  const handleOptionChange = (event, targetIndex) => {
    const newText = event.target.value;
    const isTextProperty = event.target.placeholder === "text"; // Check for text input

    setCreateQuizData((prevData) => {
      const updatedData = [...prevData];
      const updatedOptions = [...updatedData[currentIndex].options];
      updatedOptions[targetIndex] = {
        text: isTextProperty ? newText : updatedOptions[targetIndex].text,
        imgUrl: !isTextProperty ? newText : updatedOptions[targetIndex].imgUrl,
      };
      updatedData[currentIndex] = {
        ...updatedData[currentIndex],
        options: updatedOptions,
      };
      return updatedData;
    });
  };

  const handleQuestionChange = (event) => {
    const newQuestion = event.target.value;
    setCreateQuizData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentIndex].question_name = newQuestion;
      return updatedData;
    });
  };

  const handleQuestionSelect = (index) => {
    setActiveQuestion(index);
  };

  const handleCreateQuiz = async () => {
    let flag = 0;
    for (let j = 0; j < createQuizData.length; j++) {
      for (let i = 0; i < createQuizData[j].options.length; i++) {
        if (
          createQuizData[createQuizData.length - 1].options[i].text === "" &&
          quizType === "text"
        ) {
          flag = 1;
          alert("Please fill text options!");
        } else if (
          createQuizData[createQuizData.length - 1].options[i].imgUrl === "" &&
          quizType === "image"
        ) {
          flag = 1;
          alert("Please fill image URL options!");
        } else if (
          (createQuizData[createQuizData.length - 1].options[i].imgUrl === "" ||
            createQuizData[createQuizData.length - 1].options[i].text === "") &&
          quizType === "text-image"
        ) {
          flag = 1;
          alert("Please fill text and image URL options!");
        }
      }
    }
    if (createQuizData[createQuizData.length - 1].question_name === "") {
      alert("Enter question");
    } else if (
      createQuizData[createQuizData.length - 1].correct_option === -1 &&
      quizType === "qna"
    ) {
      alert("Select correct option");
    } else if (flag === 0) {
      console.log(createQuizData);
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const body = { questionUpdates: createQuizData };

        const response = await axios.patch(
          `https://quizapp-backend-yctp.onrender.com/quiz/update/${quizId}`,
          body,
          { headers }
        );

        if (response.status === 200) {
          console.log("Quiz updated successfully:", response.data);
          // Handle successful update (e.g., display success message)
        } else {
          console.error("Error updating quiz:", response);
          // Handle update error with specific response data (e.g., display error message)
        }
      } catch (error) {
        console.error("Error updating quiz:", error);
        // Handle general errors (e.g., network issues)
      }
    }
  };
  return (
    <div className="main-createQuizDiv-edit">
      <div className="subCreateQuizDiv-edit">
        {/* Question Adding Div */}
        <div className="parentCircleDiv-edit">
          {createQuizData.map((_, index) => (
            <div
              key={index}
              className={`circleDiv-edit ${
                index === activeQuestion ? "active" : ""
              }`}
              onClick={() => {
                setCurrentIndex(index);
                handleQuestionSelect(index);
              }}
            >
              {index + 1}
              {index > 0 && (
                <RxCross2
                  className="crossDiv-edit"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    deleteQuestion(index);
                  }}
                  style={{
                    cursor: "pointer",
                    color: createQuizData.length <= 1 ? "black" : "inherit",
                  }}
                  disabled={createQuizData.length <= 1}
                />
              )}
            </div>
          ))}
          <div
            className="addBtn-edit"
            onClick={addQuestions}
            disabled={createQuizData.length === 5}
          >
            +
          </div>
        </div>

        {/* Question Div */}
        <div key={currentIndex} className="questionInputDiv-edit">
          <input
            type="text"
            className="inputquestion-edit"
            value={createQuizData[currentIndex].question_name}
            onChange={(e) => handleQuestionChange(e)}
            placeholder="Enter Question Here"
          />
        </div>

        {/* Type of Questions */}
        <div className="typeMainDiv-edit">
          <div className="optionTypes-edit">Option Type</div>
          <div className="typeSubDiv-edit">
            <input
              type="radio"
              className="dot-edit"
              checked={typeSelected === 0}
              onClick={() => handleTypeSelection("text", 0)}
            />
            <p className="optiontypetext-edit">Text</p>
            <input
              type="radio"
              className="dot-edit"
              checked={typeSelected === 1}
              onClick={() => handleTypeSelection("image", 1)}
            />
            <p className="optiontypetext-edit">Image URL</p>
            <input
              type="radio"
              className="dot-edit"
              checked={typeSelected === 2}
              onClick={() => handleTypeSelection("textimage", 2)}
            />
            <p className="optiontypetext-edit">Text & Image URL</p>
          </div>
        </div>

        {/* Options and Timer */}
        <div className="seperationDiv-edit">
          <div key={currentIndex} className="OptionMainDiv-edit">
            {createQuizData[currentIndex].options.map((item, index) => (
              <div key={index} className="optionSubDiv-edit">
                {quizMainType !== "poll" && (
                  <input
                    type="radio"
                    className="dot-edit"
                    checked={
                      index === createQuizData[currentIndex].correct_option
                    }
                    onClick={() => handleDotClick(index)}
                  />
                )}
                <div className="inputFieldParent-edit">
                  {quizType === "text" ? (
                    <input
                      className="inputOptionDiv-edit"
                      type="text"
                      value={item.text}
                      placeholder="text"
                      style={{
                        backgroundColor:
                          index === createQuizData[currentIndex].correct_option
                            ? "#60B84B"
                            : "white",
                        color:
                          index === createQuizData[currentIndex].correct_option
                            ? "white"
                            : "#9F9F9F",
                      }}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                  ) : quizType === "image" ? (
                    <input
                      className="inputOptionDiv-edit"
                      type="text"
                      value={item.imgUrl}
                      placeholder="Image URL"
                      style={{
                        backgroundColor:
                          index === createQuizData[currentIndex].correct_option
                            ? "#60B84B"
                            : "white",
                        color:
                          index === createQuizData[currentIndex].correct_option
                            ? "white"
                            : "#9F9F9F",
                      }}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                  ) : (
                    <div className="input-edit">
                      <input
                        className="inputOptionDiv-edit"
                        type="text"
                        value={item.text}
                        placeholder="text"
                        style={{
                          backgroundColor:
                            index ===
                            createQuizData[currentIndex].correct_option
                              ? "#60B84B"
                              : "white",
                          color:
                            index ===
                            createQuizData[currentIndex].correct_option
                              ? "white"
                              : "#9F9F9F",
                        }}
                        onChange={(event) => handleOptionChange(event, index)}
                      />
                      <input
                        className="inputOptionDiv-edit"
                        type="text"
                        value={item.imgUrl}
                        placeholder="Image URL"
                        style={{
                          backgroundColor:
                            index ===
                            createQuizData[currentIndex].correct_option
                              ? "#60B84B"
                              : "white",
                          color:
                            index ===
                            createQuizData[currentIndex].correct_option
                              ? "white"
                              : "#9F9F9F",
                        }}
                        onChange={(event) => handleOptionChange(event, index)}
                      />
                    </div>
                  )}
                  {createQuizData[currentIndex].options.length > 2 && (
                    <div
                      className="delete-button-edit"
                      onClick={() => deleteOption(index)}
                    >
                      <img src="assets/delete.svg" alt="Delete" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {createQuizData[currentIndex].options.length < 4 && (
              <button className="add-option-button-edit" onClick={addOption}>
                Add Option
              </button>
            )}
          </div>
          {quizMainType === "qna" && (
            <div className="timerMainDiv-edit">
              <div className="timer-edit">Timer</div>
              <label
                className="offdiv-edit"
                style={{
                  backgroundColor: duration === 0 ? "red" : "white",
                  color: duration === 0 ? "white" : "#9f9f9f",
                }}
                onClick={() => handleTimerSelection(0)}
              >
                <div className="off-edit">Off</div>
              </label>
              <label
                className="fiveseconddiv-edit"
                style={{
                  backgroundColor: duration === 5 ? "red" : "white",
                  color: duration === 5 ? "white" : "#9f9f9f",
                }}
                onClick={() => handleTimerSelection(5)}
              >
                <div className="fivesecond-edit">5 sec</div>
              </label>
              <label
                className="tenseconddiv-edit"
                style={{
                  backgroundColor: duration === 10 ? "red" : "white",
                  color: duration === 10 ? "white" : "#9f9f9f",
                }}
                onClick={() => handleTimerSelection(10)}
              >
                <div className="tensecond-edit">10 sec</div>
              </label>
            </div>
          )}
        </div>

        {/* Error Message */}
        {/* {  <div className="error-message">{error}</div>} */}

        {/* Buttons */}
        <div className="quiz-buttons-type-edit">
          <Buttongroup
            text={"Cancel"}
            color="#fff"
            textColor="#474444"
            onClick={() => {
              window.location.reload();
            }}
          >
            Cancel
          </Buttongroup>
          <Buttongroup
            text={"Update Quiz"}
            color="#60B84B"
            textColor="#fff"
            onClick={() => {
              handleCreateQuiz();
              window.location.reload();
            }}
          >
            Update Quiz
          </Buttongroup>
        </div>
      </div>
    </div>
  );
};

export default TestingUpdate;
