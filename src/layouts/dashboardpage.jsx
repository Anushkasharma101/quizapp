import React, { useEffect, useState } from "react";
import "./dashboardpage.css";
import Trendingquizcard from "../components/trendingquizcard";

function Dashboardpage({cards,quizImpression,totalQuestions,quizCreated}) {

  const formatImpressions = (impressions) => {
    if (parseInt(impressions) >= 1000) {
      const formattedImpressions = parseFloat(
        parseInt(impressions) / 1000
      ).toFixed(1);
      return formattedImpressions + "k";
    }
    return impressions;
  };
  return (
    <div className="dashBoardPrimaryDiv">
      <div className="dashBoardSecondDiv">
        <div className="initialdiv">
          <div className="numberofquiz-div">
            <div className="countofquiz">
              <div className="numberquiztext">{quizCreated}</div>
              <div className="quiz">Quiz</div>
            </div>
            <div className="createdsample">
              <div className="created">Created</div>
            </div>
          </div>

          <div className="questionscreated-div">
            <div className="countofquestions">
              <div className="countquestiontext">{totalQuestions}</div>
              <div className="questions">questions</div>
            </div>
            <div className="createdsampleques">
              <div className="createdques">Created</div>
            </div>
          </div>
          <div className="totalimpressions">
            <div className="countofimpressions">
              <div className="countimpressionstext">
                {formatImpressions(quizImpression)}
              </div>
              <div className="total">Total</div>
            </div>
            <div className="createdimpressions">
              <div className="impressions">Impressions</div>
            </div>
          </div>
        </div>
        <div className="trends">
          <div className="trendingquiz">Trending Quizs</div>
        </div>
        <div className="grid-container">
          {cards.map(
            (card, index) =>
              card.total_impressions > 10 && (
                <Trendingquizcard
                  key={index}
                  quiztitle={card.title}
                  quizimpressions={card.total_impressions}
                  date={card.date}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;
