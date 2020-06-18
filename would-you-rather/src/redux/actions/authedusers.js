import {
    GET_AUTHED_USER
} from '../constants/constants.js';

export function setAuthedUser( userAuthID ) {
    return {
        type: GET_AUTHED_USER,
        userAuthID,
    }
}