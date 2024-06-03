import React,{useState} from 'react'
import './pollinterfacetext.css'
import { useNavigate } from 'react-router-dom';
import Buttongroup from '../components/buttongroup';
import axios from 'axios';


function Pollinterfacetext({data}) {
  const navigate =  useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = data.questions.length;

  const handleNextOrSubmit = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); 
    } else {
      submitQuiz();
       navigate('/thankyoupage')
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const submitQuiz = async() => {
    const quizId =  data.quizId._id;

    try{
      const response = await axios.patch(
        `https://quizapp-backend-yctp.onrender.com/quiz/updateAnalytics/${quizId}`,
        {
          headers:{
            "Content-type": "application/json",
          }
        }
      );
      console.log("Poll analytics updated successfully",response.data);
    }catch(error){
      console.error("Failed to update poll analytics:", error);
    }
  }
  return (
    <div className="poll-interface-text">
      <div className="poll-interface-content">
      <div className="poll_top_div">
        <div className="poll_question_numberdiv">
        {currentQuestion.toString().padStart(2, "0")}/
        {totalQuestions.toString().padStart(2, "0")}
        </div>
      </div>
        <div className="poll_question_div">
        {data.questions[currentQuestion - 1].question_name}
        </div>
        <div className="poll_options_div">
         {data.questions[currentQuestion -1 ].options.map((item,index) => (
          <div
            className={`poll_option_div ${selectedOption === index ? "selected" : ""}`}
            onClick={() => handleOptionClick(index)}
          >{item.text}</div>
         ))}
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

