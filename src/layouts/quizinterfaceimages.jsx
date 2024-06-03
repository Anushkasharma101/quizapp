import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import Buttongroup from "../components/buttongroup";
import axios from "axios";
import './quizinterfaceimages.css';

function Quizinterfaceimages({ data, duration }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextOrSubmit();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    setSelectedOption(null);
    setTimeLeft(duration);
  }, [currentQuestion, duration]);

  const totalQuestions = data.questions.length;

  const handleNextOrSubmit = async () => {
    if (selectedOption !== null) {
      const isCorrect = data.questions[currentQuestion - 1].correct_option === selectedOption;
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }

    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); 
    } else {
      try {
        const quizId = data.quiz._id;
        const payload = {
          questionsAttempted: data.questions.map((question, index) => ({
            _id: question._id,
            people_answered_correctly: selectedOption === question.correct_option
          }))
        };

        const response = await axios.patch(`https://quizapp-backend-yctp.onrender.com/quiz/updateAnalytics/${quizId}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Quiz analytics updated successfully:', response.data);
        navigate('/congratspage', { state: { correctAnswers } });
      } catch (error) {
        console.error('Failed to update quiz analytics:', error);
      }
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  if (!data || !data.questions || data.questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-interface-image">
      <div className="quiz-interface-content-image">
        <div className="topp_div">
          <div className="question_number_div">
            {currentQuestion.toString().padStart(2, '0')}/{totalQuestions.toString().padStart(2, '0')}
          </div>
          <div className="timer__div">
            <Timer duration={timeLeft} />
          </div>
        </div>
        <div className="question_image_div">
          {data.questions[currentQuestion - 1].question_name}
        </div>
        <div className="options_image_div">
          {data.questions[currentQuestion - 1].options.map((item, index) => (
            <div
              key={index}
              className={`option_image_div ${selectedOption === index ? "selected" : ""}`}
              onClick={() => handleOptionClick(index)}
            >
              <img src={item.imgUrl} alt={item.imgUrl} className="optionsimage" />
            </div>
          ))}
        </div>
        <div className="nextbtn_div">
          <Buttongroup 
            text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"}  
            color="#60B84B" 
            textColor="#FFFFFF" 
            onClick={handleNextOrSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Quizinterfaceimages;
