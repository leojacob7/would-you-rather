import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from './_DATA.js';

export function getInitialUsers () {
    return Promise.all([
      _getUsers(),
    ]).then(([users]) => { return ({
      users,
    }) })
  }

  export function getAllQuestions () {
    return Promise.all([
      _getQuestions(),
    ]).then(([questions]) => { return ({
      questions,
    }) })
  }

  export function saveQuestion(question) {
    return _saveQuestion(question);
  }
  
  export function saveAnswer(authUser, qid, answer) {
    return _saveQuestionAnswer({ authedUser: authUser, qid, answer });
  }
