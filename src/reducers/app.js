import { INIT } from '../actions/app';

export default function appReducer(state = {}, action) {
	switch(action.type) {
		case INIT:
			return {
				...state,
				data: action.data
			};
		default:
			return state;

	}
}