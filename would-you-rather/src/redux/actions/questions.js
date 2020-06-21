import {
	GET_QUESTIONS,
	SAVE_ANSWER_REQUESTED,
	SAVE_ANSWER_SUCCESS,
	SAVE_ANSWER_FAILURE,
	SAVE_QUESTIONS_REQUESTED,
	SAVE_QUESTIONS,
	SAVE_QUESTIONS_SUCCESS,
} from '../constants/constants.js';

import { getAllQuestions, saveAnswer } from '../../utils/API';

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
			})
			.catch((error) => {
				dispatch(saveAnswerFailure(error.message));
			});
	};
};