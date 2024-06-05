import React, { useEffect, useState } from "react";
import Dashboardpage from "./dashboardpage";
import QuizTable from "./tablepage";
import Createquizpage from "./createquizpage";
import "./heroDiv.css";
import Deleteanalyticspage from "./deleteanalyticspage";
import Createquiztype from "./createquiztype";
import Quizanalyticspage from "./quizanalyticspage";
import Editpage from "./editpage";
import Quizpublishedpage from "./quizpublishedpage";
import Testing from "./createquiztype";
import { formatDate } from "../utils/formatdate";

const HeroDiv = () => {
    const [selectedTab, setSelectedTab] = useState("dashboard");
    const [createQuizSelected,setCreateQuizSelected] = useState(false);
    const [allQuizData,setAllQuizData] = useState([]);
    const [quizImpression, setQuizImpression] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [quizCreated, setQuizCreated] = useState(0);
    const [quizId, setQuizId] = useState("");
    const [deleteButtonActive, setDeleteButtonActive] = useState(false);
    const [editButtonActive, setEditButtonActive] = useState(false);
    const [textButtonActive, setTextButtonActive] = useState(false);
    const [quizName,setQuizName] = useState('');
    const [quizType,setQuizType] = useState('');
  const [createQuizActive, setCreateQuizActive] = useState(false);
  const [publishQuizActive, setPublishQuizActive] = useState(false);
  const [url,setUrl] = useState('');
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Make sure the token exists
    if (token) {
      // Set up the request
      const apiUrl = "https://quizapp-backend-yctp.onrender.com/quiz/";
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make the API call
      fetch(apiUrl, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          // Check if the response is successful
          if (response.ok) {
            // Parse the JSON response
            return response.json();
          } else {
            // Handle errors
            throw new Error("Failed to fetch data");
          }
        })
        .then((data) => {
          // Do something with the response data, such as saving it
          console.log("API Response:", data);
          setAllQuizData(data);
          let totalImpressions = 0;
          for (let i = 0; i < data.length; i++) {
            totalImpressions += data[i].total_impressions;
          }
          setQuizImpression(totalImpressions);
          let totalQuestion = 0;
          for (let i = 0; i < data.length; i++) {
            totalQuestion += data[i].total_questions;
          }
          setTotalQuestions(totalQuestion);
          setQuizCreated(data.length);
          // Save the response data here
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error("Error:", error);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  }, [deleteButtonActive]);
  const handleTabClick = (tabName) => {
   
    console.log(tabName);
    if (tabName === "analytics") {
        setSelectedTab(tabName);
      console.log("Analytics");
    } else if (tabName === "dashboard") {
        setSelectedTab(tabName);
      console.log("dashboard");
    } else if (tabName === "createQuiz") {
      console.log("createQuiz");
      setCreateQuizSelected(true);
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the homepage or login page after logout
  };
  return (
    <div className="heroParent">
    {createQuizSelected &&  <Createquizpage setCreateQuizSelected={setCreateQuizSelected} setQuizType={setQuizType} setQuizName={setQuizName} setCreateQuizActive={setCreateQuizActive} />}
    {deleteButtonActive && <Deleteanalyticspage quizId={quizId} setDeleteButtonActive={setDeleteButtonActive} />}
    {createQuizActive && <Createquiztype title={quizName} quizMainType={quizType} setPublishQuizActive={setPublishQuizActive} setUrl={setUrl} setCreateQuizActive={setCreateQuizActive} date={formatDate(new Date())} />}
    {editButtonActive && <Editpage quizId={quizId}/>}
    {publishQuizActive && <Quizpublishedpage url={url}/>}

    <div className="hero">
      <div className="leftSide">
        <div className="logo">
        <div className="logotext">QUIZZIE</div>
        </div>
        <div className="secondarydiv">
          <div
            className={selectedTab === "dashboard" ? "selected" : "nonSelected"}
            onClick={() => {
              console.log("Dashboard clicked");
              handleTabClick("dashboard");
            }}
          >
            Dashboard
          </div>
          <div
            className={selectedTab === "analytics" ? "selected" : "nonSelected"}
            onClick={() => handleTabClick("analytics")}
          >
            Analytics
          </div>
          <div
            className={
            "nonSelected"
            }
            onClick={() => handleTabClick("createQuiz")}
          >
            Create Quiz
          </div>
        </div>
        <div className="thirddiv">
          <div className="linediv" >
            <img src="assets/line.svg" alt="line" className="lineimg" />
          </div>
          <div className="logoutdiv" onClick={()=>{logout()}}>LOGOUT</div>
        </div>
      </div>
      <div className="rightSide">
        {
            selectedTab === "dashboard"?
            <Dashboardpage cards={allQuizData}
             quizCreated={quizCreated}
                quizImpression={quizImpression}
                totalQuestions={totalQuestions}
             />: (textButtonActive? <Quizanalyticspage quizId={quizId}/>:<QuizTable tableData={allQuizData}
                setDeleteButtonActive={setDeleteButtonActive}
                setQuizId={setQuizId}
                setEditButtonActive={setEditButtonActive}
                setTextButtonActive={setTextButtonActive}
             />)
        }
      </div>
    </div>
    </div>
  );
};

export default HeroDiv;
