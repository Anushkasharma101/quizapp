import React, { useEffect, useState } from "react";
import "./tablepage.css";
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
        alert("Text copied to clipboard!");
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
                  <td>{item.date}</td>
                  <td>{item.total_impressions}</td>
                  <td>
                    <button
                      className="editquizbtn"
                      onClick={() => {
                        setEditButtonActive(true);
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
    </div>
  );
}

export default QuizTable;
