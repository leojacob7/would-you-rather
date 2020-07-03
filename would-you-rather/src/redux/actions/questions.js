import {
	GET_QUESTIONS,
	SAVE_ANSWER_REQUESTED,
	SAVE_ANSWER_SUCCESS,
	SAVE_ANSWER_FAILURE,
	SAVE_QUESTIONS_REQUESTED,
	SAVE_QUESTIONS_SUCCESS,
	SAVE_QUESTIONS_FAILURE,
} from '../constants/constants.js';

import { addAnswerForUser, addQuestionForUser } from './users';
import { getAllQuestions, saveAnswer, saveQuestion } from '../../utils/API';

export function getQuestionsList( questions ) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

export function saveAnswerRequested() {
    return {
        type: SAVE_ANSWER_REQUESTED,
        loading: true,
    }
}

export function saveAnswerSuccess(data) {
    return {
        type: SAVE_ANSWER_SUCCESS,
		loading: false,
		data,
    }
} 

export function saveAnswerFailure(error) {
    return {
        type: SAVE_ANSWER_FAILURE,
		loading: false,
		error: error
    }
}

export function saveQuestionRequested() {
    return {
        type: SAVE_QUESTIONS_REQUESTED,
        loading: true,
    }
}

export function saveQuestionSuccess(data) {
    return {
        type: SAVE_QUESTIONS_SUCCESS,
		loading: false,
		data,
    }
} 

export function saveQuestionFailure(error) {
    return {
        type: SAVE_QUESTIONS_FAILURE,
		loading: false,
		error: error
    }
}

export function getQuestions(authedUser) {
    return dispatch => 
    getAllQuestions()
    .then((data) => {
						const arrayOfQuestions = Object.keys(data.questions);
						const questions = data.questions;
						const questionsList = arrayOfQuestions.map(
							(question) => {
								if (
									questions[question].optionOne.votes.toString().includes(authedUser.id)
									||
									questions[question].optionTwo.votes.toString().includes(authedUser.id)
								) {
									questions[question].answered=true
								} else {
									questions[question].answered=false
								}
								return questions[question];
							}
						)
						const newQuestionList = Object.assign({}, ...(questionsList.map(item => ({ [item.id]: {...item} }) )));
						dispatch(getQuestionsList(newQuestionList));
					});
}

export const saveAnswerAction = (authUser, qid, answer) => {
	return (dispatch) => {
		// dispatch(saveAnswerRequested());
		saveAnswer(authUser, qid, answer)
			.then(() => {
				dispatch(saveAnswerSuccess({ authUser, qid, answer }));
				dispatch(addAnswerForUser({ authUser, qid, answer }));
			})
			.catch((error) => {
				dispatch(saveAnswerFailure(error.message));
			});
	};
};

export const saveQuestionAction = (question) => {
	return (dispatch) => {
		// dispatch(saveAnswerRequested());
		saveQuestion(question)
			.then((data) => {
				dispatch(saveQuestionSuccess(data));
				dispatch(addQuestionForUser(data));
			})
			.catch((error) => {
				dispatch(saveAnswerFailure(error.message));
			});
	};
};