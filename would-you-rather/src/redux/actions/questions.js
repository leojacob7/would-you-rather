import {
    GET_UNANSWERED_QUESTIONS,
	GET_ANSWERED_QUESTIONS,
	SAVE_ANSWER_REQUESTED,
	SAVE_ANSWER_SUCCESS,
	SAVE_ANSWER_FAILURE,
	SAVE_QUESTIONS_REQUESTED,
	SAVE_QUESTIONS,
	SAVE_QUESTIONS_SUCCESS,
} from '../constants/constants.js';
import _ from 'lodash';

import { getAllQuestions, saveAnswer } from '../../utils/API';

export function getUnansweredQuestions( questions ) {
    return {
        type: GET_UNANSWERED_QUESTIONS,
        questions,
    }
}

export function getAnsweredQuestions( questions ) {
    return {
        type: GET_ANSWERED_QUESTIONS,
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
						const answeredQuestionsList = arrayOfQuestions.filter(
							(question) => {
								return (
									questions[question].optionOne.votes
										.toString()
										.includes(authedUser.id) ||
									questions[question].optionTwo.votes
										.toString()
										.includes(authedUser.id)
								);
							}
						);

                        const unAnsweredQuestionsList = _.difference(arrayOfQuestions, answeredQuestionsList);
                        const answeredQuestions = answeredQuestionsList
							.map((questionKey) => questions[questionKey])
							.sort((a, b) => a.timeStamp - b.timeStamp);
                        const unAnsweredQuestions = unAnsweredQuestionsList
							.map((questionKey) => questions[questionKey])
							.sort((a, b) => a.timeStamp - b.timeStamp);

						dispatch(getUnansweredQuestions(unAnsweredQuestions));
						dispatch(getAnsweredQuestions(answeredQuestions));
					});
}

export const saveAnswerAction = (authUser, qid, answer) => {
	return dispatch => {
    //   dispatch(saveAnswerRequested())
      saveAnswer(authUser, qid, answer)
        .then(response => {
		  const users = response.data
		  debugger;
          dispatch(saveAnswerSuccess(users))
        })
        .catch(error => {
          dispatch(saveAnswerFailure(error.message))
        })
    }
  }