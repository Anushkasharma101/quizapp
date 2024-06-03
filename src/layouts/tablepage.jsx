import React, { useEffect, useState } from "react";
import "./tablepage.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../utils/formatdate";


function QuizTable({
  tableData,
  setDeleteButtonActive,
  setQuizId,
  setEditButtonActive,
  setTextButtonActive,
}) {
  const handleCopy = (id) => {
    navigator.clipboard
      .writeText(`http://localhost:3000/quiz/${id}`)
      .then(() => {
        toast.success(
          <div style={{ display: "flex", alignItems: "center",fontFamily:'Poppins,sans-serif',fontWeight:"600",fontSize:"16px",lineHeight:"18px",color:"#474444" }}>
            <img
              src="assets/tick.svg"
              alt="Tick"
              style={{ marginRight: "8px" }}
            />
            Link copied to Clipboard
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            icon:false
          }
        );
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="tablePrimarydiv">
      <div className="tableSecondDiv">
        <div className="table-heading">Quiz Analysis</div>
        <div className="tablediv">
          <table>
            <thead>
              <tr className="heading-row">
                <th>S.No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impressions</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Share</th>
                <th>Click Link Text</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.total_impressions}</td>
                  <td>
                    <button
                      className="editquizbtn"
                      onClick={() => {
                        setEditButtonActive(true);
                        setQuizId(item._id);
                      }}
                    >
                      <img src="assets/edit.svg" alt="edit" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="deletequizbtn"
                      onClick={() => {
                        setDeleteButtonActive(true);
                        setQuizId(item._id);
                      }}
                    >
                      <img src="assets/delete.svg" alt="delete" />
                    </button>
                  </td>
                  <td>
                    <button className="sharequizbtn" onClick={() => {handleCopy(item._id)}}>
                      <img src="assets/share.svg" alt="share" />
                    </button>
                  </td>
                  <td>
                    <div
                      className="clicklinktext"
                      onClick={() => {
                        setTextButtonActive(true);
                        setQuizId(item._id);
                      }}
                    >
                      <u>Question Wise Analysis</u>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default QuizTable;
