import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Quizinterfaceimages from "./quizinterfaceimages";
import Quizinterfacetext from "./quizinterfacetext";
import Quizinterfacetextimage from "./quizinterfacetextimage";
import axios from "axios";
import Pollinterfacetext from "./pollinterfacetext";
import Pollinterfaceimage from "./pollinterfaceimage";
import Pollinterfacetextimage from "./pollinterfacetextimage";

const MainQuizInterface = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [impressionUpdated, setImpressionUpdated] = useState(false); // Track if impression has been updated

  useEffect(() => {
    const updateImpression = async () => {
      console.log("Updating impression...");
      if (!impressionUpdated) {
        // Check if impression has already been updated
        const url = `https://quizapp-backend-yctp.onrender.com/quiz/updateImpression/${id}`;

        try {
          await axios.patch(
            url,
            {},
            {
              // Send an empty payload
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Impression updated successfully");
          setImpressionUpdated(true); // Update impression status
        } catch (error) {
          console.error("Failed to update impression:", error);
        }
      }
    };

    updateImpression();
  }, [id, impressionUpdated]); // Add impressionUpdated to dependency array

  useEffect(() => {
    console.log("Fetching quiz data...");
    fetch(`https://quizapp-backend-yctp.onrender.com/quiz/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Quiz data:", data);
        setQuizData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading quiz data</div>;
  }

  if (!quizData) {
    return <div>No quiz data found</div>;
  }

  const quizType = quizData.quiz.quizType;
  const questions = quizData.questions || [];

  return (
    <>
      {(quizType === "qna-text") &&(
        <Quizinterfacetext data={quizData} duration={quizData.quiz.duration} />
      )}
      {(quizType === "qna-image") && (
        <Quizinterfaceimages
          data={quizData}
          duration={quizData.quiz.duration}
        />
      )}
      {(quizType === "qna-textimage" ) && (
        <Quizinterfacetextimage
          data={quizData}
          duration={quizData.quiz.duration}
        />
      )}
       {quizType === "poll-text" && <Pollinterfacetext data={quizData} />}
      {quizType === "poll-image" && <Pollinterfacetext data={quizData} />}
      {quizType === "poll-textimage" && (
        <Pollinterfacetextimage data={quizData} />
      )} 
    </>
  );
};

export default MainQuizInterface;
