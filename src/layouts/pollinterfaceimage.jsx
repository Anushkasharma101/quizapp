import React, { useState } from 'react';
import './pollinterfaceimage.css';
import { useNavigate } from 'react-router-dom';
import Timer from './timer';
import Buttongroup from '../components/buttongroup';
import axios from 'axios';

function Pollinterfaceimage({ data }) {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0); // Updated to start from 0
  const totalQuestions = data.questions.length; // Get total questions from data

  const handleNextOrSubmit = () => {
    if (currentQuestion < totalQuestions - 1) { // Subtract 1 to match array indexing
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions({ ...selectedOptions, [currentQuestion]: null });
    } else {
      submitPoll();
      navigate('/thankyoupage');
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: index });
  };

  const submitPoll = async () => {
    const quizId = data.quiz._id;

    const questionsAttempted = Object.keys(selectedOptions).map((questionId, index) => ({
      _id: data.questions[index]._id, // Fetch question ID from data
      poll: selectedOptions[questionId],
    }));

    try {
      const response = await axios.patch(
        `https://quizapp-backend-yctp.onrender.com/quiz/updateAnalytics/${quizId}`,
        { questionsAttempted },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Poll analytics updated successfully', response.data);
    } catch (error) {
      console.error('Failed to update poll analytics:', error);
    }
  };

  return (
    <div className="poll-interface-image">
      <div className="poll-interface-content-image">
        <div className="poll_top_div">
          <div className="poll_question_number_div">
            {currentQuestion + 1}/{totalQuestions}
          </div>
          <div className="poll_timer_div">
            <Timer duration={duration} />
          </div>
        </div>
        <div className="poll_question_image_div">
          {data.questions[currentQuestion].question_name}
        </div>
        <div className="poll_options_image_div">
          {data.questions[currentQuestion].options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={`poll_option_image_div ${selectedOptions[currentQuestion] === optionIndex ? 'selected' : ''}`}
              onClick={() => handleOptionClick(optionIndex)}
            >
              <img src={`assets/${option.imgUrl}`} alt={`optionimage_${optionIndex}`} className="optionsimage" />
            </div>
          ))}
        </div>
        <div className="pollnextbtn_div">
          <Buttongroup
            text={currentQuestion === totalQuestions - 1 ? 'SUBMIT' : 'NEXT'} // Subtract 1 to match array indexing
            color="#60B84B"
            textColor="#FFFFFF"
            onClick={handleNextOrSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Pollinterfaceimage;
