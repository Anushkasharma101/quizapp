import axios from 'axios';

export const FETCH_QUIZZES_REQUEST = 'FETCH_QUIZZES_REQUEST';
export const FETCH_QUIZZES_SUCCESS = 'FETCH_QUIZZES_SUCCESS';
export const FETCH_QUIZZES_FAILURE = 'FETCH_QUIZZES_FAILURE';

const fetchQuizzesRequest = () => {
    return {
        type: FETCH_QUIZZES_REQUEST
    };
};

const fetchQuizzesSuccess = (quizzes) => {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        payload: quizzes
    };
};

const fetchQuizzesFailure = (error) => {
    return {
        type: FETCH_QUIZZES_FAILURE,
        payload: error
    };
};

export const fetchQuizzes = () => {
    return (dispatch) => {
        dispatch(fetchQuizzesRequest());
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjU2M2I5NWMzOTYyZTM0YTY2NjQ0OTQiLCJpYXQiOjE3MTY5MjczODF9.CFKrADWk6sdth_ViFbmqGkGd1Qc1CLFtR9co9Q13wL0'; // Assuming token is stored in localStorage
        axios.get('https://quizapp-backend-yctp.onrender.com/quiz/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const quizzes = response.data;
            dispatch(fetchQuizzesSuccess(quizzes));
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(fetchQuizzesFailure(errorMsg));
        });
    };
};
