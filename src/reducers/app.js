import { INIT_APP } from '../actions/app';

export default function appReducer(state = {}, action) {
	switch(action.type) {
		case INIT_APP:
			return {
				...state,
				...action.data
			};
		default:
			return state;

	}
}