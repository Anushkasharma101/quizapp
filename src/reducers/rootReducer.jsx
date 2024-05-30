// src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import { quizReducer } from '../reducers/quizReducer';
import getquizReducer from '../reducers/getQuizReducer';
const rootReducer = combineReducers({
    quiz: quizReducer,
    getQuiz:getquizReducer
});

export default rootReducer;
