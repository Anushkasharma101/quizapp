import React ,{useState}from 'react'
import './pollinterfacetextimage.css'
import { useNavigate } from 'react-router-dom';
import Timer from './timer';
import Buttongroup from '../components/buttongroup';


const Pollinterfacetextimage = () =>{
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
        navigate('/thankyoupage')
      }
    };
  
  
    const handleOptionClick = (index) => {
      setSelectedOption(index);
    };

  return (
    <div className="poll-interface-textimage">
    <div className="poll-interface-textimage-content">
    <div className="polltopp__div">
      <div className="poll_questionnumber_textimage_div"> 0{currentQuestion}/0{totalQuestions}</div>
      <div className="poll_timer___div">
        {/* <button onClick={() => setDuration(10)}>10 Seconds</button>
        <button onClick={() => setDuration(5)}>5 Seconds</button> */}
        <Timer duration={duration} />
      </div>
      </div>
      <div className="poll_question_textimage_div">
      Your question text comes here, its a sample text.
      </div>
      <div className="poll_options_textimage_div">
        <div className={`poll_option_textimage_div ${selectedOption === 0 ? "selected" : ""}`}
          onClick={() => handleOptionClick(0)}>
            <div className="text_option">
              Option 1
            </div>
            <div className="image_option">
            <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
            </div>
        </div>
        <div  className={`poll_option_textimage_div ${selectedOption === 1 ? "selected" : ""}`}
          onClick={() => handleOptionClick(1)}>
            <div className="text_option">
              Option 2
            </div>
            <div className="image_option">
            <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
            </div>
        </div>
        <div  className={`poll_option_textimage_div ${selectedOption === 2 ? "selected" : ""}`}
          onClick={() => handleOptionClick(2)}>
            <div className="text_option">
              Option 3
            </div>
            <div className="image_option">
            <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
            </div>
        </div>
        <div  className={`poll_option_textimage_div ${selectedOption === 3 ? "selected" : ""}`}
          onClick={() => handleOptionClick(3)}>
            <div className="text_option">
              Option 4
            </div>
            <div className="image_option">
            <img src="assets/optionsimage.jpg" alt="optionimage" className='optionsimage'/>
            </div>
        </div>
        
      </div>
      <div className="pollnextbtndiv">
        <Buttongroup text={currentQuestion === totalQuestions ? "SUBMIT" : "NEXT"} 
        color= "#60B84B" 
        textColor="#FFFFFF" 
        onClick={handleNextOrSubmit}/>
      </div>
    </div>
  </div>
  )
}

export default Pollinterfacetextimage