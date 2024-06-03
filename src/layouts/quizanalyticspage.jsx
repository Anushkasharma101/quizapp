import React, { useEffect, useState } from "react";
import "./quizanalyticspage.css";
import axios from "axios";
import { formatDate } from "../utils/formatdate";


const QuestionCardanalytics = ({
  textquiz,
  attemptedquiz,
  correctquiz,
  incorrectquiz,
  questionnumberquiz,
}) => {
  return (
    <div className="question-card-analytics">
      <div className="question-text-analytics">
        {questionnumberquiz} {textquiz}
      </div>
      <div className="stats-analytics">
        <div className="stat-analytics">
          <div>{attemptedquiz}</div>
          <div className="totalattempted-quiz">
            people Attempted the question
          </div>
        </div>
        <div className="stat1-analytics">
          <div>{correctquiz}</div>
          <div className="correctly-quiz">people Answered Correctly</div>
        </div>
        <div className="stat2-analytics">
          <div>{incorrectquiz}</div>
          <div className="incorrectly-quiz">people Answered Incorrectly</div>
        </div>
      </div>
      <div className="greyline-quiz">
        <img src="assets/line.png" alt="line" className="line-quiz" />
      </div>
    </div>
  );
};
const QuestionPollCardanalytics = ({
  questionnumberquiz,
  textquiz,
  polls
}) => {
  return (
    <div className="question-card-analytics">
      <div className="question-text-analytics">
        {questionnumberquiz} {textquiz}
      </div>
      <div className="stats-analyticspoll">
      {
        polls.map((item,index)=>(
          (item !== -1 && <div key={index} className="stat-analyticspoll">
            <div>{item}</div>
            <div className="totalattemptedpoll-quiz">
            Option {index+1}
            </div>
          </div>)
        ))
      }
      </div>
      <div className="greyline-quiz">
        <img src="assets/line.png" alt="line" className="line-quiz" />
      </div>
    </div>
  );
};

function Quizanalyticspage({ quizId }) {
  console.log(quizId);
  const [questionsData, setQuestionsData] = useState([]);
  const[quizData,setQuizData] = useState({});
  const [correct_option,setCorrectOption] = useState(-1);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `https://quizapp-backend-yctp.onrender.com/quiz/${quizId}`
        );
        const { quiz, questions } = response.data;
        setQuizData(quiz);
        console.log(response.data);
        setCorrectOption(questions[0].correct_option);
        console.log(questions[0].correct_option);
        if(correct_option !== -1){
        const formattedQuestionsData = questions.map((question, index) => ({
          id: index + 1,
          questionnumberquiz: `${index + 1}`,
          textquiz: question.question_name,
          attemptedquiz: question.people_attempts,
          correctquiz: question.people_answered_correctly,
          incorrectquiz: question.people_answered_incorrectly,
        }));
        console.log(formattedQuestionsData);
        setQuestionsData(formattedQuestionsData);
      }else{
          const formattedQuestionsData = questions.map((question, index) => ({
          id: index + 1,
          questionnumberquiz: `${index + 1}`,
          textquiz: question.question_name,
          polls: question.polls
        }));
        setQuestionsData(formattedQuestionsData)
      }
        // console.log('formattedQuestions',formattedQuestionsData);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [correct_option,quizId]);
  
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  
  return (
    <>
      <div className="seconddivquizanalytics">
        <div className="topquizbarquizanalytics">
          <div className="quizdivquizanalytics">{ quizData.title }</div>
          <div className="quizdataquizanalytics">
            <div className="createdonquizanalytics">
            Created on : {formatDate(quizData.date)}
            </div>
            <div className="totalimpressionscountquizanalytics">
            Impressions : {quizData.total_impressions}
            </div>
          </div>
        </div>
        <div className="question-list-quizanalytics">
          {correct_option === -1?
            questionsData.map((question, index) => (
            <QuestionPollCardanalytics
              key={index + 1}
              questionnumberquiz={`Q.${index + 1}`}
              textquiz={question.textquiz}
              polls={question.polls}
            />
          ))
          :questionsData.map((question, index) => (
            <QuestionCardanalytics
              key={index + 1}
              questionnumberquiz={`Q.${question.questionnumberquiz}`}
              textquiz={question.textquiz}
              attemptedquiz={question.attemptedquiz}
              correctquiz={question.correctquiz}
              incorrectquiz={question.incorrectquiz}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Quizanalyticspage;
