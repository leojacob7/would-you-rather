import {
    GET_QUESTIONS,
    SAVE_ANSWER_REQUESTED,
    SAVE_ANSWER_SUCCESS,
    SAVE_ANSWER_FAILURE,
    SAVE_QUESTIONS_SUCCESS
} from '../constants/constants.js';

const initialState = {};

export function getQuestions( state = initialState, action ) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            }
        case SAVE_ANSWER_REQUESTED: {
            return {
                ...state,
                [state.loading]: true,
                loading: action.loading
            }
        }
        case SAVE_ANSWER_SUCCESS:
            const { authUser, qid, answer } = action.data;

            const newState = {
				...state,
				[qid]: {
					...state[qid],
					answered: true,
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat(authUser),
					},
				},
			};
            return newState;

        case SAVE_ANSWER_FAILURE:
            const { error } = action;
            return {
                ...state,
                error,
            }
        
        case SAVE_QUESTIONS_SUCCESS:
            const question = action.data;
            debugger;
            return {
                ...state,
                [question.id]: question,
		};

        default: return state
    }
}