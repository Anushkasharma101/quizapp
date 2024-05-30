// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchQuizzes } from "../actions/getQuizAction";

// const QuizList = () => {
//   const dispatch = useDispatch();
//   const quizState = useSelector((state) => state.getQuiz);

//   useEffect(() => {
//     dispatch(fetchQuizzes());
//   }, [dispatch]);

//   return (
//     <div>
//       {quizState.loading && <p>Loading...</p>}
//       {quizState.error && <p>{quizState.error}</p>}
//       {quizState.quizzes && quizState.quizzes.length > 0 ? (
//         <ul>
//           {quizState.quizzes.map((quiz) => (
//             <li key={quiz._id}>
//               <h2>Quiz ID: {quiz._id}</h2>
//               <p>Date: {new Date(quiz.date).toLocaleDateString()}</p>
//               <p>Total Questions: {quiz.total_questions}</p>
//               <ul>
//                 {quiz.questions.map((question) => (
//                   <li key={question._id}>
//                     <p>{question.question_name}</p>
//                     <p>
//                       Options: {question.option_1}, {question.option_2},{" "}
//                       {question.option_3}, {question.option_4}
//                     </p>
//                   </li>
//                 ))}
//               </ul>

//               {/* <ul>
//                 {quiz.questions.map((question) => (
//                   <li key={question._id}>
//                     <p>{question.question_name}</p>
//                     <ul>
//                       {question.options.map((option, index) => (
//                         <li key={index}>
//                           {option.text && <span>{option.text}</span>}
//                           {option.imageUrl && (
//                             <img src={option.imageUrl} alt="Option Img" />
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul> */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No quizzes available</p>
//       )}
//     </div>
//   );
// };

// export default QuizList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizzes } from "../actions/getQuizAction";

const QuizList = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.getQuiz);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div>
      {quizState.loading && <p>Loading...</p>}
      {quizState.error && <p>{quizState.error}</p>}
      {quizState.quizzes && quizState.quizzes.length > 0 ? (
        <ul>
          {quizState.quizzes.map((quiz) => (
            <li key={quiz._id}>
              <h2>Quiz ID: {quiz._id}</h2>
              <p>Date: {new Date(quiz.date).toLocaleDateString()}</p>
              <p>Total Questions: {quiz.total_questions}</p>
              <ul>
                {quiz.questions.map((question) => (
                  <li key={question._id}>
                    <p>{question.question_name}</p>
                    <ul>
                      {question.options.map((option, index) => (
                        
                        <li key={index}>
                              <span>{option.text}</span>
                              <img
                                src={option.imgUrl}
                                alt="Option Img"
                                width={10}
                                height={10}
                              />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available</p>
      )}
    </div>
  );
};

export default QuizList;
