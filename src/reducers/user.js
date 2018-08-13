import {
    SET_USER
} from '../actions/user';

export default function userReducer(state = {
    status: 'anonymous',
    user: null,
    errorMsg: null
}, action) {
	switch(action.type) {
		case SET_USER:
			return {
				...state,
				status: action.status,
                user: action.user,
                errorMsg: action.errorMsg
			};
		default:
			return state;

	}
}
