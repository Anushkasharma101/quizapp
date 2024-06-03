import React from "react";
import "./deleteanalyticspage.css";
import { useNavigate } from "react-router-dom";
import Buttongroup from "../components/buttongroup";
import axios from "axios";

function Deleteanalyticspage({setDeleteButtonActive,quizId}) {
  const handleDelete = () => {
    const token = localStorage.getItem("token");

    const deleteUrl = `https://quizapp-backend-yctp.onrender.com/quiz/${quizId}`;
    axios
      .delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Delete successful:", response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting quiz:", error);
        alert("Failed to delete quiz");
      });
  };
  const handleCancelClick = (event) => {
    event.target.classList.add("cancel-shadow");
    setDeleteButtonActive(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="deleteheading">
          Are you sure you
          <br />
          want to delete?
        </h2>
        <div className="modal-buttons">
          <Buttongroup
            onClick={()=>{setDeleteButtonActive(false); handleDelete();}}
            text="Confirm Delete"
            color=" #FF4B4B"
            textColor="#fff"
          />
        <Buttongroup onClick={handleCancelClick} text="Cancel" color="#fff" />
        </div>
      </div>
    </div>
  );
}

export default Deleteanalyticspage;
