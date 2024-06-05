import React, { useEffect, useState } from "react";
import "./dashboardpage.css";
import Trendingquizcard from "../components/trendingquizcard";
import { PacmanLoader } from "react-spinners";

function Dashboardpage({ cards, quizImpression, totalQuestions, quizCreated }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); 
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <PacmanLoader loading={loading} />
      </div>
    );
  }

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
            <div className="innernumberofquizdiv">
              <div className="countofquiz">
                <div className="numberquiztext">{quizCreated}</div>
                <div className="quiz">Quiz</div>
              </div>
              <div className="createdsample">Created</div>
            </div>
          </div>

         <div className="questionscreated-div">
            <div className="innernumberofquestionsdiv">
              <div className="countofquestions">
                <div className="countquestiontext">{totalQuestions}</div>
                <div className="questions">questions</div>
              </div>
              <div className="createdsampleques">
                Created
              </div>
            </div>
          </div>
          <div className="totalimpressions-div">
            <div className="innernumberofimpressionsdiv">
              <div className="countofimpressions">
                <div className="countimpressionstext">
                  {formatImpressions(quizImpression)}
                </div>
                <div className="total">Total</div>
              </div>
              <div className="createdimpressions">
                Impressions
              </div>
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
