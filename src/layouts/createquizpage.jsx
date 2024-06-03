// import React, { useState } from "react";
// import "./createquizpage.css";
// import { useNavigate } from "react-router-dom";
// import Buttongroup from "../components/buttongroup";

// function Createquizpage({setCreateQuizSelected,setQuizType,setQuizName, setCreateQuizActive}) {

//   const [validationError, setValidationError] = useState("");

//   const [selectedDiv, setSelectedDiv] = useState({
//     qna: false,
//     poll: false,
//   });

//   const handleQnaDivClick = () => {
//     setSelectedDiv({ qna: true, poll: false });
//     setQuizType("qna");
//   };

//   const handlePollDivClick = () => {
//     setSelectedDiv({ qna: false, poll: true });
//     setQuizType("poll");
//   };

//   const handleCancelClick = (event) => {
//     event.target.classList.add("cancel-shadow");
//     setCreateQuizSelected(false);
//   };

//   const handlecontinueClick = (event) => {
//     event.target.classList.add("cancel-shadow");
//     setCreateQuizActive(true);
//     setCreateQuizSelected(false);
//     // setEditButtonActive(true);
//   }

//   return (
//     <div className="modal-quiz">
//       <div className="quiz-content">
//         <input className="quizname"
//          placeholder="Quiz name"
//          onChange={(e)=>{setQuizName(e.target.value)}}
//         >
         
//         </input>
//         <div className="quiztype">
//           <div className="quiztypetext">Quiz Type</div>
//           <div
//             className={`qadiv ${selectedDiv.qna ? "selected" : ""}`}
//             onClick={handleQnaDivClick}
//           >
//             Q & A
//           </div>
//           <div
//             className={`polldiv ${selectedDiv.poll ? "selected" : ""}`}
//             onClick={handlePollDivClick}
//           >
//             Poll Type
//           </div>
//         </div>
//         <div className="quiz-buttons">
//           <Buttongroup onClick={handleCancelClick} text="Cancel" color="#fff" />
//           <Buttongroup
//             onClick={handlecontinueClick}
//             text="Continue"
//             color="#60B84B"
//             textColor="#fff"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Createquizpage;

import React, { useState } from "react";
import "./createquizpage.css";
import Buttongroup from "../components/buttongroup";

function Createquizpage({ setCreateQuizSelected, setQuizType, setQuizName, setCreateQuizActive }){
  const [quizName, updateQuizName] = useState("");
  const [validationError, setValidationError] = useState({ quizName: "", quizType: "" });
  const [selectedDiv, setSelectedDiv] = useState({
    qna: false,
    poll: false,
  });

  const handleQnaDivClick = () => {
    setSelectedDiv({ qna: true, poll: false });
    setQuizType("qna");
    setValidationError((prev) => ({ ...prev, quizType: "" })); // Clear quiz type error when selected
  };

  const handlePollDivClick = () => {
    setSelectedDiv({ qna: false, poll: true });
    setQuizType("poll");
    setValidationError((prev) => ({ ...prev, quizType: "" })); // Clear quiz type error when selected
  };

  const handleCancelClick = (event) => {
    event.target.classList.add("cancel-shadow");
    
    setCreateQuizSelected(false);
  };

  const handleContinueClick = (event) => {
    event.target.classList.add("cancel-shadow");

    let errors = {};
    if (!quizName) {
      errors.quizName = "Please enter a quiz name.";
    }

    if (!selectedDiv.qna && !selectedDiv.poll) {
      errors.quizType = "Please choose a quiz type.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }

    setCreateQuizActive(true);
    setCreateQuizSelected(false);
  };

  return (
    <div className="modal-quiz">
      <div className="quiz-content">
        <div className="input-container">
          <input
            className={`quizname ${validationError.quizName ? "input-error" : ""}`}
            placeholder="Quiz name"
            onChange={(e) => {
              updateQuizName(e.target.value);
              setQuizName(e.target.value);
              setValidationError((prev) => ({ ...prev, quizName: "" })); // Clear quiz name error when typing
            }}
          />
          {validationError.quizName && <div className="error">{validationError.quizName}</div>}
        </div>
        <div className="quiztype">
          <div className="quiztypetext">Quiz Type</div>
          <div
            className={`qadiv ${selectedDiv.qna ? "choosen" : ""}`}
            onClick={handleQnaDivClick}
          >
            Q & A
          </div>
          <div
            className={`polldiv ${selectedDiv.poll ? "choosen" : ""}`}
            onClick={handlePollDivClick}
          >
            Poll Type
          </div>
          {validationError.quizType && <div className="error">{validationError.quizType}</div>}
        </div>
        <div className="quiz-buttons">
          <Buttongroup onClick={handleCancelClick} text="Cancel" color="#fff" />
          <Buttongroup
            onClick={handleContinueClick}
            text="Continue"
            color="#60B84B"
            textColor="#fff"
          />
        </div>
      </div>
    </div>
  );
}

export default Createquizpage;


