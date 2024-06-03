import React, { useState, useEffect } from "react";
import "./quizinterfacetext.css";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import Buttongroup from "../components/buttongroup";
import axios from "axios";
import Quizcompleted from "./quizcompleted";
import Thankyoupage from "./thankyoupage";

function Quizinterfacetext({ data, duration }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionsAttempted, setQuestionsAttempted] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showQuizCompleted, setShowQuizCompleted] = useState(false);
  const [showThankyoupage,setShowThankYouPage] = useState(false);
  const totalQuestions = data.questions.length;

  useEffect(() => {
    if (duration !== 0) {
      const timer = setTimeout(() => {
        handleNextOrSubmit();
      }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentQuestion, duration]);

  const handleNextOrSubmit = () => {
    const isCorrect =
      selectedOption !== null &&
      data.questions[currentQuestion - 1].correct_option === selectedOption;
  
    const questionId = data.questions[currentQuestion - 1]._id;
  
    // Check if the question is already attempted
    const questionAlreadyAttempted = questionsAttempted.some(
      (attempt) => attempt._id === questionId
    );
  
    // Add the question attempt only if it's not already attempted
    if (!questionAlreadyAttempted) {
      const questionAttempt = {
        _id: questionId,
        people_answered_correctly: isCorrect,
      };
  
      setQuestionsAttempted((prev) => [...prev, questionAttempt]);
    }
  
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      submitQuiz();
    }
  };
  
  const handleOptionClick = (index) => {
    const isCorrect =
      data.questions[currentQuestion - 1].correct_option === index;
  
    const questionId = data.questions[currentQuestion - 1]._id;
  
    // Check if the question is already attempted
    const questionAlreadyAttempted = questionsAttempted.some(
      (attempt) => attempt._id === questionId
    );
  
    // Add the question attempt only if it's not already attempted
    if (!questionAlreadyAttempted) {
      const questionAttempt = {
        _id: questionId,
        people_answered_correctly: isCorrect,
      };
  
      setSelectedOption(index);
      setQuestionsAttempted((prev) => [...prev, questionAttempt]);
    }
  };

  const submitQuiz = async () => {
    const quizId = data.quiz._id;
    const payload = {
      questionsAttempted: questionsAttempted.map((q) => ({
        _id: q._id,
        people_answered_correctly: q.people_answered_correctly,
      })),
    };
  
    try {
      const response = await axios.patch(
        `https://quizapp-backend-yctp.onrender.com/quiz/updateAnalytics/${quizId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quiz analytics updated successfully:", payload);
      setShowQuizCompleted(true);
    } catch (error) {
      console.error("Failed to update quiz analytics:", error);
    }
  };
  

  if (!data || !data.questions || data.questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-interface-text">
      <div className="quiz-interface-content">
        <div className="top_div">
          <div className="question_numberdiv">
            {currentQuestion.toString().padStart(2, "0")}/
            {totalQuestions.toString().padStart(2, "0")}
          </div>
          {duration !== 0 && (
            <div className="timer_div">
              <Timer duration={duration} />
            </div>
          )}
        </div>
        <div className="question_div">
          {data.questions[currentQuestion - 1].question_name}
        </div>
        <div className="options_div">
          {data.questions[currentQuestion - 1].options.map((item, index) => (
            <div
              key={index}
              className={`option_div ${selectedOption === index ? "selected" : ""}`}
              onClick={() => handleOptionClick(index)}
            >
              {item.text}
            </div>
          ))}
        </div>
        <div className="nextbtn">
          <Buttongroup
            text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"}
            color="#60B84B"
            textColor="#FFFFFF"
            onClick={handleNextOrSubmit}
          />
        </div>
      </div>
      {showQuizCompleted && (
        <Quizcompleted
          correctAnswer={`${correctAnswers}/${totalQuestions}`}
        />
      )
      }
    </div>
  );
}

export default Quizinterfacetext;
