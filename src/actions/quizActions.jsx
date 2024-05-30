// src/actions/quizActions.js

import axios from 'axios';

export const CREATE_QUIZ_REQUEST = 'CREATE_QUIZ_REQUEST';
export const CREATE_QUIZ_SUCCESS = 'CREATE_QUIZ_SUCCESS';
export const CREATE_QUIZ_FAILURE = 'CREATE_QUIZ_FAILURE';

export const createQuiz = (quizData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_QUIZ_REQUEST });
        
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2M2I5NWMzOTYyZTM0YTY2NjQ0OTQiLCJpYXQiOjE3MTY5MjczODF9.CFKrADWk6sdth_ViFbmqGkGd1Qc1CLFtR9co9Q13wL0';
            const response = await axios.post('https://quizapp-backend-yctp.onrender.com/quiz/create-quiz', quizData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({ type: CREATE_QUIZ_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: CREATE_QUIZ_FAILURE, payload: error.message });
        }
    }
}
