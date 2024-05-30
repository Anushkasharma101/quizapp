import React, { useState } from "react";
import "./quizinterfacetext.css";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import Buttongroup from "../components/buttongroup";

function Quizinterfacetext({}) {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5;

  const handleNextOrSubmit = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); 
    } else {
      navigate('/congratspage')
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
 
  return (
    <div className="quiz-interface-text">
      <div className="quiz-interface-content">
      <div className="top_div">
        <div className="question_numberdiv">0{currentQuestion}/0{totalQuestions}</div>
        <div className="timer_div">
          {/* <button onClick={() => setDuration(10)}>10 Seconds</button>
          <button onClick={() => setDuration(5)}>5 Seconds</button> */}
          <Timer duration={duration} />
        </div>
        </div>
        <div className="question_div">
        Your question text comes here, its a sample text.
        </div>
        <div className="options_div">
        <div
            className={`option_div ${selectedOption === 0 ? "selected" : ""}`}
            onClick={() => handleOptionClick(0)}
          >Option 1</div>
          <div
            className={`option_div ${selectedOption === 1 ? "selected" : ""}`}
            onClick={() => handleOptionClick(1)}
          >Option 2</div>
           <div
            className={`option_div ${selectedOption === 2 ? "selected" : ""}`}
            onClick={() => handleOptionClick(2)}
          >Option 3</div>
           <div
            className={`option_div ${selectedOption === 3 ? "selected" : ""}`}
            onClick={() => handleOptionClick(3)}
          >Option 4</div>
        </div>
        <div className="nextbtn">
          <Buttongroup text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"} 
          color= "#60B84B" 
          textColor="#FFFFFF" 
          onClick={handleNextOrSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default Quizinterfacetext;
