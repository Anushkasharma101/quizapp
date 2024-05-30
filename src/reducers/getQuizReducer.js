import { FETCH_QUIZZES_REQUEST, FETCH_QUIZZES_SUCCESS, FETCH_QUIZZES_FAILURE } from '../actions/getQuizAction';

const initialState = {
    loading: false,
    quizzes: [],
    error: ''
};

const getquizReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUIZZES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                loading: false,
                quizzes: action.payload,
                error: ''
            };
        case FETCH_QUIZZES_FAILURE:
            return {
                loading: false,
                quizzes: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default getquizReducer;
