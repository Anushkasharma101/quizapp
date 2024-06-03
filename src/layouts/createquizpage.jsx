import React, { useState } from "react";
import "./createquizpage.css";
import { useNavigate } from "react-router-dom";
import Buttongroup from "../components/buttongroup";

function Createquizpage({setCreateQuizSelected,setQuizType,setQuizName, setCreateQuizActive}) {

  const [validationError, setValidationError] = useState("");

  const [selectedDiv, setSelectedDiv] = useState({
    qna: false,
    poll: false,
  });

  const handleQnaDivClick = () => {
    setSelectedDiv({ qna: true, poll: false });
    setQuizType("qna");
  };

  const handlePollDivClick = () => {
    setSelectedDiv({ qna: false, poll: true });
    setQuizType("poll");
  };

  const handleCancelClick = (event) => {
    event.target.classList.add("cancel-shadow");
    setCreateQuizSelected(false);
  };

  const handlecontinueClick = (event) => {
    event.target.classList.add("cancel-shadow");
    setCreateQuizActive(true);
    setCreateQuizSelected(false);
    // setEditButtonActive(true);
  }

  return (
    <div className="modal-quiz">
      <div className="quiz-content">
        <input className="quizname"
         placeholder="Quiz name"
         onChange={(e)=>{setQuizName(e.target.value)}}
        >
         
        </input>
        <div className="quiztype">
          <div className="quiztypetext">Quiz Type</div>
          <div
            className={`qadiv ${selectedDiv.qna ? "selected" : ""}`}
            onClick={handleQnaDivClick}
          >
            Q & A
          </div>
          <div
            className={`polldiv ${selectedDiv.poll ? "selected" : ""}`}
            onClick={handlePollDivClick}
          >
            Poll Type
          </div>
        </div>
        <div className="quiz-buttons">
          <Buttongroup onClick={handleCancelClick} text="Cancel" color="#fff" />
          <Buttongroup
            onClick={handlecontinueClick}
            text="Continue"
            color="#60B84B"
            textColor="#fff"
          />
        </div>
      </div>
    </div>
  );
}

export default Createquizpage;
