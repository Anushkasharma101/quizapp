import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

import './createquiztype.css'
import Buttongroup from "../components/buttongroup";

const Createquiztype = ({ quizMainType,title,date,setPublishQuizActive,setUrl,setCreateQuizActive }) => {
  const [createQuizData, setCreateQuizData] = useState([
    {
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
  const [quizType, setQuizType] = useState("text"); // Default quiz type
  const [duration, setDuration] = useState(0); // Default duration
  const [currentIndex, setCurrentIndex] = useState(0); // Current question index
  const [isTypeSelected, setIsTypeSelected] = useState(false); // Flag for type selection
  const [typeSelected, setTypeSelected] = useState(0);
  const addQuestions = () => {

    if (createQuizData.length < 5) {
      let flag = 0;
      for(let i =0;i<createQuizData[currentIndex].options.length;i++) {
        if(createQuizData[currentIndex].options[i].text === "" && quizType==="text"){
          flag = 1;
          alert("Please fill text options!");
        }else if(createQuizData[currentIndex].options[i].imgUrl === "" && quizType==="imgUrl"){
          flag = 1;
          alert("Please image url options!");
        }else if((createQuizData[currentIndex].options[i].imgUrl === "" || createQuizData[currentIndex].options[i].text === "") && quizType==="textImage"){
          flag = 1;
          alert("Please text and image url options!");
        } 
      }
        if(createQuizData[currentIndex].question_name === '' ){
            alert('enter question')
          }
          else if(createQuizData[currentIndex].correct_option === -1 && quizMainType === 'qna'){
            alert('select correct option')
          }else if(flag === 0){
            setCreateQuizData((prev) => [
                ...prev,
                {
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
    setDuration(newDuration); // Update duration state
    
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
  const handleCreateQuiz = async() => {
    const payload = {
        title: title,
        duration: duration,
        date: date,
        quizType:`${quizMainType}-${quizType}`,
        questions: createQuizData,
    }
    let flag =0;
    for(let i =0;i<createQuizData[createQuizData.length -1].options.length;i++) {
      if(createQuizData[createQuizData.length -1].options[i].text === "" && quizType==="text"){
        flag = 1;
        alert("Please fill text options!");
      }else if(createQuizData[createQuizData.length -1].options[i].imgUrl === "" && quizType==="imgUrl"){
        flag = 1;
        alert("Please image url options!");
      }else if((createQuizData[createQuizData.length -1].options[i].imgUrl === "" || createQuizData[createQuizData.length -1].options[i].text === "") && quizType==="textImage"){
        flag = 1;
        alert("Please text and image url options!");
      } 
    }
    if(createQuizData[createQuizData.length -1].question_name === '' ){
        alert('enter question')
      }
      else if(createQuizData[createQuizData.length -1].correct_option === -1 && quizMainType === 'qna'){
        alert('select correct option')
      }else if(flag === 0){
        console.log(payload);
        try {
            const token = localStorage.getItem('token'); 
        
            const headers = {
              Authorization: `Bearer ${token}`,
            };
        
            const body = payload;
        
            const response = await axios.post('https://quizapp-backend-yctp.onrender.com/quiz/create-quiz', body, { headers });
        
            if (response.status === 201) {
              console.log("Quiz created successfully:", response.data);
              setPublishQuizActive(true);
              setUrl(response.data.id);
              setCreateQuizActive(false);
              // Handle successful creation (e.g., display success message)
            } else {
              console.error("Error creating quiz:", response);
              // Handle creation error with specific response data (e.g., display error message)
            }
          } catch (error) {
            console.error("Error creating quiz:", error);
            // Handle general errors (e.g., network issues)
          }
      } 
  };

  return (
    <div className="main-createQuizDiv">
      <div className="subCreateQuizDiv">
        {/* question adding div */}
        <div className="parentCircleDiv">
            
          {createQuizData.map((_, index) => (
            <div
              className={`circleDiv ${index === activeQuestion ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(index);
                handleQuestionSelect(index);
              }}
            >
              {index + 1}
             {index > 0 && ( 
              <RxCross2
                className="crossDiv"
                onClick={() => deleteQuestion(index)}
              >
                style ={{
                  cursor: "pointer",
                  color:createQuizData.length <=1 ? "black" : "inherit",
                }}
                disabled={createQuizData.length <=1}
              </RxCross2>
             )}
            </div>
          ))}
          <div
            className="addBtn"
            onClick={addQuestions}
            disabled={createQuizData.length === 5}
          >
            {" "}
            +{" "}
          </div>
        </div>

        {/* question Div */}
        <div key={currentIndex} className="questionInputDiv">
          <input
            type="text"
            className="inputquestion"
            value={createQuizData[currentIndex].question_name}
            onChange={(e) => handleQuestionChange(e)}
            placeholder="Enter Question Here"
          />{" "}
          {/* Placeholder for question input */}
        </div>

        {/* type of questions */}

        <div className="typeMainDiv">
          <div className="optionTypes">Option Type</div>
          <div className="typeSubDiv">
            <input
              type="radio"
              className="dot"
              checked={typeSelected === 0}
              onClick={() => handleTypeSelection("text", 0)}
            />{" "}
           <p className="optiontypetext">Text</p> 
            <input
              type="radio"
              className="dot"
              checked={typeSelected === 1}
              onClick={() => handleTypeSelection("image", 1)}
            />{" "}
            <p className="optiontypetext">Image URL</p> 
            <input
              type="radio"
              className="dot"
              checked={typeSelected === 2}
              onClick={() => handleTypeSelection("textimage", 2)}
            />{" "}
            <p className="optiontypetext">Text & Image URL</p> 
          </div>
        </div>

        {/* div with timer */}
        <div className="seperationDiv">

          <div key={currentIndex} className="OptionMainDiv">
            {createQuizData[currentIndex].options.map((item, index) => (
              <div key={index} className="optionSubDiv">
                {quizMainType !== "poll" && (
                  <input
                    type="radio"
                    className="dot"
                    checked={
                      index === createQuizData[currentIndex].correct_option
                    }
                    onClick={() => handleDotClick(index)}
                  />
                )}

                <div className="inputFieldParent">
                  {quizType === "text" ? (
                    <input
                      className="inputOptionDiv"
                      type="text"
                      value={item.text}
                      placeholder="text"
                      style={ { backgroundColor: index === createQuizData[currentIndex].correct_option? '#60B84B': "white", color: index === createQuizData[currentIndex].correct_option?'white':'#9F9F9F'}}
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                  ) : quizType === "image" ? (
                    <input
                      className="inputOptionDiv"
                      type="text"
                      value={item.imgUrl}
                      style={ { backgroundColor: index === createQuizData[currentIndex].correct_option? '#60B84B': "white", color: index === createQuizData[currentIndex].correct_option?'white':'#9F9F9F'}}
                      placeholder="Image Url"
                      onChange={(event) => handleOptionChange(event, index)}
                    />
                  ) : (
                    <div className="input-create">
                      <input
                        className="inputOptionDiv"
                        type="text"
                        value={item.text}
                        style={ { backgroundColor: index === createQuizData[currentIndex].correct_option? '#60B84B': "white", color: index === createQuizData[currentIndex].correct_option?'white':'#9F9F9F'}}
                        placeholder="text"
                        onChange={(event) => handleOptionChange(event, index)}
                      />
                      <input
                        className="inputOptionDiv"
                        type="text"
                        value={item.imgUrl}
                        style={ { backgroundColor: index === createQuizData[currentIndex].correct_option? '#60B84B': "white", color: index === createQuizData[currentIndex].correct_option?'white':'#9F9F9F'}}
                        placeholder="Image Url"
                        onChange={(event) => handleOptionChange(event, index)}
                      />
                    </div>
                  )}
                </div>
                {index > 1 && (
                  <div
                    onClick={() => {
                      deleteOption(index);
                    }}
                  >
                    <img src="assets/delete.svg" alt="Delete" className="delete-button"/>
                  </div>
                )}
              </div>
            ))}
            {createQuizData[currentIndex].options.length !== 4 && (
              <div className="addOptionDiv" onClick={addOption}>
                Add option
              </div>
            )}
          </div>

          {/* timmer div */}

          {quizMainType !== "poll" && (
            <div className="timerMainDiv">
            <p className="timer">Timer</p>
            <div
                className="timerSubDiv"
                onClick={() => handleTimerSelection(0)}
                style={{
                  backgroundColor: duration === 0 ? "red" : "white",
                          color: duration === 0 ? "white" : "#9f9f9f",
                }}
              >
                Off
              </div>
              <div
                className="timerSubDiv"
                onClick={() => handleTimerSelection(5)}
                style={{
                          backgroundColor: duration === 5 ? "red" : "white",
                          color: duration === 5 ? "white" : "#9f9f9f",
                        }}
              >
                5 sec
              </div>
              <div
                className="timerSubDiv"
                onClick={() => handleTimerSelection(10)}
                style={{
                          backgroundColor: duration === 10 ? "red" : "white",
                          color: duration === 10 ? "white" : "#9f9f9f",
                        }}
              >
                10 sec
              </div>
            </div>
          )}
        </div>
        
        <div className="quiz-buttons-type">
          <Buttongroup
           text={"Cancel"}
           color="#fff"
           textColor="#474444"
           onClick={() => {window.location.reload();}}
         >Cancel</Buttongroup>
          <Buttongroup
          text={"Create Quiz"}
          color="#60B84B"
          textColor="#fff"
          onClick={handleCreateQuiz}>Create Quiz</Buttongroup>
        </div>
      </div>
    </div>
  );
};

export default Createquiztype;
