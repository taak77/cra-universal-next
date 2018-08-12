import {getBootstrap} from '../api';

export const INIT_APP = 'INIT_APP';

export function initApp(data) {
    return {
        type: INIT_APP,
        data
    };
}

export function fetchBootstrap() {
    return async (dispatch) => {
        let data;
        try {
            data = await getBootstrap();
        } catch (err) {
            data = {}; // TODO: use fallback data
        }
        dispatch(initApp(data));
    }
}
