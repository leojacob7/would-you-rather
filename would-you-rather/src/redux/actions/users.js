import {
    GET_USERS,
    ADD_ANSWER_FOR_USER,
    ADD_QUESTION_FOR_USER
} from '../constants/constants.js';

export function getUsers( users ) {
    return {
        type: GET_USERS,
        users,
    }
}

export function addAnswerForUser( data ) {
    return {
        type: ADD_ANSWER_FOR_USER,
        data,
    }
}

export function addQuestionForUser( data ) {
    return {
        type: ADD_QUESTION_FOR_USER,
        data,
    }
}