import { getInitialUsers } from '../../utils/API';
import { getQuestions } from './questions';
import { getUsers } from './users';
import { getAuthedUser } from './authedusers';

export function getUsersAction() {
    return dispatch => 
    getInitialUsers()
    .then((data) => {
        dispatch( getUsers(data.users) );
    });
}