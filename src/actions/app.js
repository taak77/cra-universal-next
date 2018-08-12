import { getBootstrap } from '../api';

export const INIT_APP = 'INIT_APP';

export function initApp(data) {
	return {
		type: INIT_APP,
		data
	};
}

export function fetchBootstrap() {
	return async (dispatch) => {
		const data = await getBootstrap();
		dispatch(initApp(data));
	}
}