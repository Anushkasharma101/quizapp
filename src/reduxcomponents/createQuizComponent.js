// src/components/CreateQuizComponent.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuiz } from "../actions/quizActions";

const CreateQuizComponent = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz);

  const [quizData, setQuizData] = useState({
    total_questions: 4,
    date: "15 June 2023",
    quizType: "quizimageUrl",
    questions: [
      {
        question_name: "What is the largest mammal?",
        options: [
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
        ],
        polls: [],
        correct_option: 1,
      },
      {
        question_name: "Which country is known as the Land of the Rising Sun?",
        options: [
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
        ],
        polls: [],
        correct_option: 2,
      },
      {
        question_name: "What is the chemical symbol for water?",
        options: [
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
        ],
        polls: [],
        correct_option: 2,
      },
      {
        question_name: "What is the chemical symbol for water?",
        options: [
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
        ],
        polls: [],
        correct_option: 2,
      },
    ],
  });

  const handleSubmit = () => {
    dispatch(createQuiz(quizData));
  };

  return (
    <div>
      <button onClick={handleSubmit}>Create Quiz</button>
      {quizState.loading && <p>Loading...</p>}
      {quizState.quiz && <p>Quiz created successfully!</p>}
      {quizState.error && <p>Error: {quizState.error}</p>}
    </div>
  );
};

export default CreateQuizComponent;
