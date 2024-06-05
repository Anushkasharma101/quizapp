import React, { useState, useEffect } from 'react';
import Timer from "./timer";
import { useNavigate } from "react-router-dom";
import Buttongroup from "../components/buttongroup";
import axios from "axios";
import './quizinterfacetextimage.css';
import Quizcompleted from "./quizcompleted";

function Quizinterfacetextimage({ data, duration }) {
  
  const totalQuestions = data.questions.length;
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showQuizCompleted, setShowQuizCompleted] = useState(false);

  useEffect(() => {
    if (duration === 0) {
      return;
    }

    const timer = setTimeout(() => {
      handleNextOrSubmit();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [currentQuestion, duration]);

  const handleNextOrSubmit = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      submitQuiz();
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const submitQuiz = async () => {
    const quizId = data.quiz._id;
    const payload = {
      questionsAttempted: questionsAttempted.filter(
        (q) => q.people_answered_correctly !== undefined
      ),
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
      console.log("Quiz analytics updated successfully:", response.data);
      // After submitting the quiz, navigate to the Congratulations page with the correct number of questions
      setShowQuizCompleted(true);
    } catch (error) {
      console.error("Failed to update quiz analytics:", error);
    }
  };

  if (!data || !data.questions || data.questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-interface-textimage">
      <div className="quiz-interface-textimage-content">
        <div className="topp__div">
          <div className="questionnumber_textimage_div">0{currentQuestion + 1}/0{totalQuestions}</div>
          {duration > 0 && (
            <div className="timer___div">
              <Timer duration={duration} />
            </div>
          )}
        </div>
        <div className="question_textimage_div">
          {data.questions[currentQuestion].question_name}
        </div>
        <div className="options_textimage_div">
          {data.questions[currentQuestion].options.map((option, index) => (
            <div
              key={option._id}
              className={`option_textimage_div ${selectedOption === index ? "selected" : ""}`}
              onClick={() => handleOptionClick(index)}
            > 
              <div className="text_option">
                {option.text}
              </div>
              <div className="image_option">
                <img src={option.imgUrl} alt={`option-${index}`} className="optionsimage" />
              </div>
            </div>
          ))}
        </div>
        <div className="nextbtndiv">
          <Buttongroup
            text={currentQuestion === totalQuestions - 1 ? "SUBMIT" : "NEXT"}
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
      )}
    </div>
  );
}

export default Quizinterfacetextimage;


