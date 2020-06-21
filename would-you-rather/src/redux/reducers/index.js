import { getAuthedUser } from './authedusers';
import { getQuestions } from './questions';
import { getUsers } from './users';
import { combineReducers } from 'redux';

export default combineReducers({
    authedUser: getAuthedUser,
    questions: getQuestions,
    users: getUsers,
    loading: false,
})