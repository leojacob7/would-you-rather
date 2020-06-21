import { getInitialUsers } from '../../utils/API';
import { getUsers } from './users';

export function getUsersAction() {
    return dispatch => 
    getInitialUsers()
    .then((data) => {
        dispatch( getUsers(data.users) );
    });
}