import {
    GET_QUESTIONS,
    GET_UNANSWERED_QUESTIONS,
    GET_ANSWERED_QUESTIONS,
    SAVE_ANSWER_REQUESTED,
    SAVE_ANSWER_SUCCESS,
    SAVE_ANSWER_FAILURE,
} from '../constants/constants.js';

const initialState = {
    answeredQuestions: {},
    unansweredQuestions: {},
}

export function getQuestions( state = initialState, action ) {
    switch (action.type) {
        case GET_UNANSWERED_QUESTIONS:
            return {
                ...state,
                unansweredQuestions : action.questions,
            }
        case GET_ANSWERED_QUESTIONS:
            return {
                ...state,
                answeredQuestions : action.questions,
            }
        case SAVE_ANSWER_REQUESTED: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case SAVE_ANSWER_SUCCESS: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}