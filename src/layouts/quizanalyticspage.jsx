import React, { useState } from 'react';
import './quizanalyticspage.css';

const QuestionCardanalytics = ({ textquiz, attemptedquiz, correctquiz, incorrectquiz,questionnumberquiz }) => {
  return (
    <div className="question-card-analytics">
      <div className="question-text-analytics">{questionnumberquiz} {textquiz}</div>
      <div className="stats-analytics">
      <div className="stat-analytics">
          <div>{attemptedquiz}</div>
          <div className="totalattempted-quiz">people Attempted the question</div>
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
        <img src="assets/line.png" alt="line" className='line-quiz'/>
      </div>
    </div>
  );
};

function Quizanalyticspage() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const questionsData = [
    {
      id: 1,
      questionnumberquiz:'Q.1',
      textquiz: 'What is the capital of France?',
      attemptedquiz: 10,
      correctquiz: 8,
      incorrectquiz: 2,
    },
    {
      id: 2,
      questionnumberquiz:'Q.2',
      textquiz: 'What is the square root of 16?',
      attemptedquiz: 12,
      correctquiz: 11,
      incorrectquiz: 1,
    },
    {
      id: 3,
      questionnumberquiz:'Q.3',
      textquiz: 'What is the chemical symbol for water?',
      attemptedquiz: 15,
      correctquiz: 15,
      incorrectquiz: 0,
    },
    {
        id: 4,
        questionnumberquiz:'Q.1',
        textquiz: 'What is the capital of France?',
        attemptedquiz: 10,
        correctquiz: 8,
        incorrectquiz: 2,
      },
      {
        id: 5,
        questionnumberquiz:'Q.2',
        textquiz: 'What is the square root of 16?',
        attemptedquiz: 12,
        correctquiz: 11,
        incorrectquiz: 1,
      },
      {
        id: 6,
        questionnumberquiz:'Q.3',
        textquiz: 'What is the chemical symbol for water?',
        attemptedquiz: 15,
        correctquiz: 15,
        incorrectquiz: 0,
      },
  ];

  return (
    <div className="primarydivquizanalytics">
      <div className="firstdivquizanalytics">
        <div className="logoquizanalytics">QUIZZIE</div>
        <div className="secondarydivquizanalytics">
          <div
            className={`dashboardanalytics ${selectedTab === 'dashboard' ? 'selected' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`Analyticsanalytics ${selectedTab === 'analytics' ? 'selected' : ''}`}
            onClick={() => handleTabClick('analytics')}
          >
            Analytics
          </div>
          <div
            className={`CreateQuizanalytics ${selectedTab === 'createQuiz' ? 'selected' : ''}`}
            onClick={() => handleTabClick('createQuiz')}
          >
            Create Quiz
          </div>
        </div>
        <div className="thirddivquizanalytics">
          <div className="linedivquizanalytics">
            <img src="assets/line.svg" alt="line" className="lineimg" />
          </div>
          <div className="logoutdivquizanalytics">LOGOUT</div>
        </div>
      </div>
      <div className="seconddivquizanalytics">
      <div className="topquizbarquizanalytics">
        <div className="quizdivquizanalytics">Quiz 2 Question Analysis</div>
        <div className="quizdataquizanalytics">
            <div className="createdonquizanalytics">Created on : 04 Sep, 2023</div>
            <div className="totalimpressionscountquizanalytics">Impressions : 667</div>
        </div>
      </div>
      <div className="question-list-quizanalytics">
        {questionsData.map((question) => (
          <QuestionCardanalytics
            key={question.id}
            questionnumberquiz={question.questionnumberquiz}
            textquiz={question.textquiz}
            attemptedquiz={question.attemptedquiz}
            correctquiz={question.correctquiz}
            incorrectquiz={question.incorrectquiz}
          />
        ))}
        </div>
        </div>
      </div>
    
  );
}

export default Quizanalyticspage;
