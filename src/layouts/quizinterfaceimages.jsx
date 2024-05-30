import React,{useState} from 'react'
import Timer from "./timer";
import { useNavigate } from "react-router-dom";

import Buttongroup from "../components/buttongroup";
import './quizinterfaceimages.css';


function Quizinterfaceimages() {
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
    <div className="quiz-interface-image">
      <div className="quiz-interface-content-image">
      <div className="topp_div">
        <div className="question_number_div">0{currentQuestion}/0{totalQuestions}</div>
        <div className="timer__div">
          {/* <button onClick={() => setDuration(10)}>10 Seconds</button>
          <button onClick={() => setDuration(5)}>5 Seconds</button> */}
          <Timer duration={duration} />
        </div>
        </div>
        <div className="question_image_div">
        Your question text comes here, its a sample text.
        </div>
        <div className="options_image_div">
          <div className={`option_image_div ${selectedOption === 0 ? "selected" : ""}`}
            onClick={() => handleOptionClick(0)}>
            <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
          </div>
          <div className={`option_image_div ${selectedOption === 1 ? "selected" : ""}`}
            onClick={() => handleOptionClick(1)}>
          <img src="assets/demoimg.jpg" alt="optionimage" className='optionsimage'/>
          </div>
          <div className={`option_image_div ${selectedOption === 2 ? "selected" : ""}`}
            onClick={() => handleOptionClick(2)}>
          <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage' />
          </div>
          <div className={`option_image_div ${selectedOption === 3 ? "selected" : ""}`}
            onClick={() => handleOptionClick(3)}>
          <img src="assets/demoimg.jpg" alt="optionimage" className='optionsimage'/>
          </div>
        </div>
        <div className="nextbtn_div">
          <Buttongroup text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"}  
          color= "#60B84B" 
          textColor="#FFFFFF" 
          onClick={handleNextOrSubmit}/>
        </div>
      </div>
    </div>
  );
}



export default Quizinterfaceimages
