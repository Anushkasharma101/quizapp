// src/reducers/quizReducer.js

import { CREATE_QUIZ_REQUEST, CREATE_QUIZ_SUCCESS, CREATE_QUIZ_FAILURE } from '../actions/quizActions';

const initialState = {
    loading: false,
    quiz: null,
    error: null
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUIZ_REQUEST:
            return { ...state, loading: true };
        case CREATE_QUIZ_SUCCESS:
            return { ...state, loading: false, quiz: action.payload, error: null };
        case CREATE_QUIZ_FAILURE:
            return { ...state, loading: false, quiz: null, error: action.payload };
        default:
            return state;
    }
};
