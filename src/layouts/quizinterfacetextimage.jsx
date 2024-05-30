import React,{useState} from 'react'
import Timer from "./timer";
import { useNavigate } from "react-router-dom";

import Buttongroup from "../components/buttongroup";
import './quizinterfacetextimage.css';

function Quizinterfacetextimage() {
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
    <div className="quiz-interface-textimage">
      <div className="quiz-interface-textimage-content">
      <div className="topp__div">
        <div className="questionnumber_textimage_div"> 0{currentQuestion}/0{totalQuestions}</div>
        <div className="timer___div">
          {/* <button onClick={() => setDuration(10)}>10 Seconds</button>
          <button onClick={() => setDuration(5)}>5 Seconds</button> */}
          <Timer duration={duration} />
        </div>
        </div>
        <div className="question_textimage_div">
        Your question text comes here, its a sample text.
        </div>
        <div className="options_textimage_div">
          <div className={`option_textimage_div ${selectedOption === 0 ? "selected" : ""}`}
            onClick={() => handleOptionClick(0)}>
              <div className="text_option">
                Option 1
              </div>
              <div className="image_option">
              <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
              </div>
          </div>
          <div  className={`option_textimage_div ${selectedOption === 1 ? "selected" : ""}`}
            onClick={() => handleOptionClick(1)}>
              <div className="text_option">
                Option 2
              </div>
              <div className="image_option">
              <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
              </div>
          </div>
          <div  className={`option_textimage_div ${selectedOption === 2 ? "selected" : ""}`}
            onClick={() => handleOptionClick(2)}>
              <div className="text_option">
                Option 3
              </div>
              <div className="image_option">
              <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
              </div>
          </div>
          <div  className={`option_textimage_div ${selectedOption === 3 ? "selected" : ""}`}
            onClick={() => handleOptionClick(3)}>
              <div className="text_option">
                Option 4
              </div>
              <div className="image_option">
              <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
              </div>
          </div>
          
        </div>
        <div className="nextbtndiv">
          <Buttongroup text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"} 
          color= "#60B84B" 
          textColor="#FFFFFF" 
          onClick={handleNextOrSubmit}/>
        </div>
      </div>
    </div>
  );
}





export default Quizinterfacetextimage
