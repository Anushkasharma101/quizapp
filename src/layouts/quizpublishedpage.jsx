import React from "react";
import "./quizpublishedpage.css";
import { useNavigate } from "react-router-dom";
import Buttongroup from "../components/buttongroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

function Quizpublishedpage({url}) {
  const notify = () => {
    navigator.clipboard.writeText(`https://quizapp-psi-seven.vercel.app/quiz/${url}`)
      .then(() => {
        console.log('Text copied to clipboard');
        alert('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
    toast.success(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="assets/tick.svg"
          alt="Tick"
          style={{ marginRight: "8px" }}
        />
        Link Copied to Clipboard
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
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <div className="modal-quizpublish">
      <div className="quiz-publish-content">
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
        <div className="closebtndiv">
          <img
            src="assets/charm_cross.svg"
            alt="closebtn"
            className="closebtnpublish"
            onClick={() => {window.location.reload();}}
          />
        </div>
        <h2 className="quiz-publish-heading">
          Congrats your Quiz is <br />
          Published!
        </h2>
        <div className="quiz-publish-link">
          <div className="quiz-publish-link-text">{`https://quizapp-psi-seven.vercel.app/quiz/${url}`}</div>
        </div>
        <div className="modal-buttons-publish">
          <Buttongroup
            onClick={notify}
            text="Share"
            color="#60B84B"
            textColor="#fff"
          />
        </div>
      </div>
    </div>
  );
}

export default Quizpublishedpage;
