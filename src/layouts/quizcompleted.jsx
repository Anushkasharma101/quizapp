// Quizcompleted.js
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './quizcompleted.css';

function Quizcompleted() {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modal-quizcomplete">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="quiz-complete-content">
        <h2 className="quiz-complete-heading">Congrats, Quiz is completed!</h2>
        <div className="quiz-complete-trophy">
          <img src="assets/trophy.png" alt="trophy" className="trophyimg" />
        </div>
        <div className="quiz-score">
          <div className="your-scorediv">Your Score is</div>
          &nbsp;
          <div className="your-score">03/04</div>
        </div>
      </div>
    </div>
  );
}

export default Quizcompleted;
