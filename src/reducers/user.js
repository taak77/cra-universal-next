import {
    SET_USER
} from '../actions/user';

export default function userReducer(state = {
    status: 'anonymous',
    isLoggedIn: false,
    errorMsg: null
}, action) {
	switch(action.type) {
        case SET_USER:
			return {
                ...state,
                status: action.status,
                cognitoUser: action.user,
                attributes: action.user && action.user.attributes || undefined,
                errorMsg: action.errorMsg,
                isLoggedIn: action.status !== 'anonymous'
            };
		default:
			return state;

	}
}
