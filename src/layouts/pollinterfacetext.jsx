import React,{useState} from 'react'
import './pollinterfacetext.css'
import { useNavigate } from 'react-router-dom';
import Timer from './timer';
import Buttongroup from '../components/buttongroup';


function Pollinterfacetext() {
  const navigate =  useNavigate();
    const [duration, setDuration] = useState(10);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 5;

  const handleNextOrSubmit = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); 
    } else {
       navigate('/thankyoupage')
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  return (
    <div className="poll-interface-text">
      <div className="poll-interface-content">
      <div className="poll_top_div">
        <div className="poll_question_numberdiv">0{currentQuestion}/0{totalQuestions}</div>
        <div className="poll_timer_div">
          {/* <button onClick={() => setDuration(10)}>10 Seconds</button>
          <button onClick={() => setDuration(5)}>5 Seconds</button> */}
          <Timer duration={duration} />
        </div>
        </div>
        <div className="poll_question_div">
        Your question text comes here, its a sample text.
        </div>
        <div className="poll_options_div">
        <div
            className={`poll_option_div ${selectedOption === 0 ? "selected" : ""}`}
            onClick={() => handleOptionClick(0)}
          >Option 1</div>
          <div
            className={`poll_option_div ${selectedOption === 1 ? "selected" : ""}`}
            onClick={() => handleOptionClick(1)}
          >Option 2</div>
           <div
            className={`poll_option_div ${selectedOption === 2 ? "selected" : ""}`}
            onClick={() => handleOptionClick(2)}
          >Option 3</div>
           <div
            className={`poll_option_div ${selectedOption === 3 ? "selected" : ""}`}
            onClick={() => handleOptionClick(3)}
          >Option 4</div>
        </div>
        <div className="pollnextbtn">
          <Buttongroup text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"} 
          color= "#60B84B" 
          textColor="#FFFFFF" 
          onClick={handleNextOrSubmit}/>
        </div>
      </div>
    </div>
  )
}

export default Pollinterfacetext