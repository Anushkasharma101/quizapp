import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Quizinterfaceimages from './quizinterfaceimages';
import Quizinterfacetext from './quizinterfacetext';
import Quizinterfacetextimage from './quizinterfacetextimage';
import Pollinterfaceimage from './pollinterfaceimage';
import Pollinterfacetext from './pollinterfacetext';
import Pollinterfacetextimage from './pollinterfacetextimage';

const MainQuizInterface = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://quizapp-backend-yctp.onrender.com/quiz/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
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

  const { quizType } = quizData.quiz;
  const questions = quizData.questions || [];

  const determineOptionType = () => {
    let hasText = false;
    let hasImage = false;

    questions.forEach(question => {
      question.options.forEach(option => {
        if (option.text!=="") hasText = true;
        if (option.imgUrl!=="") hasImage = true;
      });
    });

    if (hasText && hasImage) return 'text-image';
    if (hasImage) return 'image';
    return 'text';
  };

  const optionsType = determineOptionType();

  return (
    <>
      {quizType === 'quizText' ? (
        optionsType === 'text' ? (
          <Quizinterfacetext />
        ) : optionsType === 'image' ? (
          <Quizinterfaceimages />
        ) : optionsType === 'text-image' ? (
          <Quizinterfacetextimage />
        ) : null
      ) : quizType === 'poll' ? (
        optionsType === 'text' ? (
          <Pollinterfacetext />
        ) : optionsType === 'image' ? (
          <Pollinterfaceimage />
        ) : optionsType === 'text-image' ? (
          <Pollinterfacetextimage />
        ) : null
      ) : null}
    </>
  );
};

export default MainQuizInterface;
