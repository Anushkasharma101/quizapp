import React from "react";
import "./trendingquizcard.css";

function Trendingquizcard({ quiztitle, quizimpressions, date }) {
  const ClickHandler = ()=>{
    console.log(quiztitle);
  }
  return (
    <div className="trendingquizcard">
      <div className="masterdiv">
        <div className="quiznumber">{quiztitle}</div>
        <div className="noofimpressions">
          <div className="eachquizimpressions">{quizimpressions}</div>
          <div className="eyediv">
          <img
            src="assets/Group.svg"
            alt="noofimpressions-eye"
            className="noofimpressions-eye"
          />
          </div>
        </div>
      </div>
      <div className="quizdate">
        <div className="quiztext">Created on :</div>
        <div className="quizimpressiondate">{date}</div>
      </div>
    </div>
  );
}

export default Trendingquizcard;
