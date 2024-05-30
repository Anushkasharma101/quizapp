import React, { useState, useEffect } from 'react';
import './timer.css'

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

 

  useEffect(() => {
    setTimeLeft(duration);
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {;
          clearInterval(interval);
         return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    
    return () => clearInterval(interval);
  }, [duration]);

  
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <div className='time'>00:{seconds === 10 ? null : 0}{seconds}s</div>
    </div>
  );
};

export default Timer;
