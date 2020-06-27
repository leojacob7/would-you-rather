import {
    GET_USERS,
    ADD_ANSWER_FOR_USER,
    ADD_QUESTION_FOR_USER
} from '../constants/constants.js';

export function getUsers( state = {}, action ) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users,
            }

        case ADD_ANSWER_FOR_USER:
            const { authUser, qid, answer } = action.data;
            const newState = {
				...state,
				[authUser]: {
					...state[authUser],
					answers: {
						...state[authUser].answers,
						[qid]: answer,
					},
				},
			};
            return newState;
    
            case ADD_QUESTION_FOR_USER:
                const { id, author } = action.data;

                return {
					...state,
					[author]: {
						...state[author],
						questions: state[author].questions.concat(id),
					},
				};
        
        default: return state
    }
}