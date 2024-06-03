import React, { useState } from 'react';
import './pollinterfacetextimage.css';
import { useNavigate } from 'react-router-dom';
import Buttongroup from '../components/buttongroup';
import axios from 'axios';

const Pollinterfacetextimage = ({ data }) => {
  const navigate = useNavigate();
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
    <div className="poll-interface-textimage">
      <div className="poll-interface-textimage-content">
        <div className="polltopp__div">
          <div className="poll_questionnumber_textimage_div">{currentQuestion + 1}/{totalQuestions}</div>
          <div className="poll_timer___div">
          </div>
        </div>
        <div className="poll_question_textimage_div">
          {data.questions[currentQuestion].question_name}
        </div>
        <div className="poll_options_textimage_div">
          {data.questions[currentQuestion].options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={`poll_option_textimage_div ${selectedOptions[currentQuestion] === optionIndex ? 'selected' : ''}`}
              onClick={() => handleOptionClick(optionIndex)}
            >
              <div className="text_option">
                {option.text}
              </div>
              <div className="image_option">
                <img src={option.imgUrl} alt={`optionimage_${optionIndex}`} className='optionsimage'/>
              </div>
            </div>
          ))}
        </div>
        <div className="pollnextbtndiv">
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
};

export default Pollinterfacetextimage;
