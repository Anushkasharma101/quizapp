import React, { useState } from 'react';
import './pollanalyticspage.css';

const PollCard = ({ textpoll, attemptedpoll, correctpoll, incorrectpoll, hintUsedpoll, questionnumberpoll }) => {
  return (
    <div className="question-card-pollanalytics">
      <div className="question-text-pollanalytics">{questionnumberpoll} {textpoll}</div>
      <div className="stats-pollanalytics">
        <div className="stat-pollanalytics">
          <div>{attemptedpoll}</div>
          <div className="totalattemptedpoll">Option 1</div>
        </div>
        <div className="stat1-pollanalytics">
          <div>{correctpoll}</div>
          <div className="correctlypoll">Option 2</div>
        </div>
        <div className="stat2-pollanalytics">
          <div>{incorrectpoll}</div>
          <div className="incorrectlypoll">Option 3</div>
        </div>
        <div className="stat3-pollanalytics">
          <div>{hintUsedpoll}</div>
          <div className="hintused-pollanalytics">Option 4</div>
        </div>
      </div>
      <div className="greyline-poll">
        <img src="assets/line.png" alt="line" className='line-poll'/>
      </div>
    </div>
  );
};

function Pollanalyticspage() {
  const [selectedTab, setSelectedTab] = useState('analytics');
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const questionsData = [
    {
      id: 1,
      questionnumberpoll: 'Q.1',
      textpoll: 'What is the capital of France?',
      attemptedpoll: 10,
      correctpoll: 8,
      incorrectpoll: 2,
      hintUsedpoll: 1,
    },
    {
      id: 2,
      questionnumberpoll: 'Q.2',
      textpoll: 'What is the square root of 16?',
      attemptedpoll: 12,
      correctpoll: 11,
      incorrectpoll: 1,
      hintUsedpoll: 2,
    },
    {
      id: 3,
      questionnumberpoll: 'Q.3',
      textpoll: 'What is the chemical symbol for water?',
      attemptedpoll: 15,
      correctpoll: 15,
      incorrectpoll: 0,
      hintUsedpoll: 0,
    },
    {
      id: 4,
      questionnumberpoll: 'Q.4',
      textpoll: 'Who wrote "To Kill a Mockingbird"?',
      attemptedpoll: 9,
      correctpoll: 7,
      incorrectpoll: 2,
      hintUsedpoll: 3,
    },
    {
      id: 5,
      questionnumberpoll: 'Q.5',
      textpoll: 'What is the largest planet in our Solar System?',
      attemptedpoll: 14,
      correctpoll: 12,
      incorrectpoll: 2,
      hintUsedpoll: 4,
    },
    {
      id: 6,
      questionnumberpoll: 'Q.6',
      textpoll: 'What is the smallest prime number?',
      attemptedpoll: 13,
      correctpoll: 11,
      incorrectpoll: 2,
      hintUsedpoll: 1,
    },
    {
      id: 7,
      questionnumberpoll: 'Q.7',
      textpoll: 'What is the smallest prime number?',
      attemptedpoll: 13,
      correctpoll: 11,
      incorrectpoll: 2,
      hintUsedpoll: 1,
    },
    {
      id: 8,
      questionnumberpoll: 'Q.8',
      textpoll: 'What is the smallest prime number?',
      attemptedpoll: 13,
      correctpoll: 11,
      incorrectpoll: 2,
      hintUsedpoll: 1,
    },
  ];

  return (
    <div className="primarydivpoll">
      <div className="firstdivpoll">
        <div className="logopoll">QUIZZIE</div>
        <div className="secondarydivpoll">
          <div
            className={`dashboardpoll ${selectedTab === 'dashboard' ? 'selected' : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`Analyticspoll ${selectedTab === 'analytics' ? 'selected' : ''}`}
            onClick={() => handleTabClick('analytics')}
          >
            Analytics
          </div>
          <div
            className={`CreateQuizpoll ${selectedTab === 'createQuiz' ? 'selected' : ''}`}
            onClick={() => handleTabClick('createQuiz')}
          >
            Create Quiz
          </div>
        </div>
        <div className="thirddivpoll">
          <div className="linedivpoll">
            <img src="assets/line.svg" alt="line" className="lineimgpoll" />
          </div>
          <div className="logoutdivpoll">LOGOUT</div>
        </div>
      </div>
      <div className="seconddivpoll">
        <div className="topquizbarpoll">
          <div className="quizdivpoll">Quiz 2 Question Analysis</div>
          <div className="quizdatapoll">
            <div className="createdonpoll">Created on : 04 Sep, 2023</div>
            <div className="totalimpressionscountpoll">Impressions : 667</div>
          </div>
        </div>
        <div className="question-list-poll">
          {questionsData.map((question) => (
            <PollCard
              key={question.id}
              questionnumberpoll={question.questionnumberpoll}
              textpoll={question.textpoll}
              attemptedpoll={question.attemptedpoll}
              correctpoll={question.correctpoll}
              incorrectpoll={question.incorrectpoll}
              hintUsedpoll={question.hintUsedpoll}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pollanalyticspage;
