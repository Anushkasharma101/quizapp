import React from 'react'
import './quizpublishedpage.css'
import { useNavigate } from 'react-router-dom';
import Buttongroup from '../components/buttongroup';

function Quizpublishedpage() {
  const navigate = useNavigate();
  return (
    <div className="modal-quizpublish">
      <div className="quiz-publish-content">
        <div className="closebtndiv">
        <div className="toast">
          <img src="assets/tick.svg" alt="tickimg" className='tickimg' />
          <div className="toastmsg">Link copied to Clipboard</div>
          <img src="assets/toastclosebtn.svg" alt="toastclosebtn" className='toastclosebtn'/>
        </div>
        <img src="assets/charm_cross.svg" alt="closebtn" className='closebtnpublish' onClick={() => navigate("/analytics")}/>
        </div>
        <h2 className="quiz-publish-heading">
        Congrats your Quiz is <br/>Published!
        </h2>
        <div className="quiz-publish-link">
        <div className="quiz-publish-link-text">your link is here</div>
        </div>
         <div className="modal-buttons-publish">
        <Buttongroup onClick={onclick} text="Share" color="#60B84B" textColor="#fff"/>
        </div>
      </div>
    </div>
  )
}

export default Quizpublishedpage;