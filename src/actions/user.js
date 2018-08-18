/* eslint-disable no-empty */
import * as API from "../api/user";
import userSelector from '../selectors/userSelector';

export const SET_USER = 'SET_USER';

export function setUser({status, user, errorMsg}) {
    return {
        type: SET_USER,
        status,
        user,
        errorMsg
    };
}

export function getCurrentUser() {
    return async (dispatch) => {
        let status;
        let user;
        try {
            user = await API.getCurrentUser();
        } catch (err) {}
        status = user ? 'signedin' : 'anonymous';
        dispatch(setUser({status, user}));

        return user;
    }
}

export function signUp({username, email, password}) {
    return async (dispatch) => {
        let status;
        let user;
        let errorMsg;
        try {
            status = 'unconfirmed';
            user = await API.signUp({username, email, password});
        } catch (err) {
            status = 'anonymous';
            errorMsg = err.message;
        }
        dispatch(setUser({status, user, errorMsg}));
    }
}

export function signIn({username, password}) {
    return async (dispatch) => {
        let status;
        let user;
        let errorMsg;
        try {
            status = 'signedin';
            user = await API.signIn({username, password});
        } catch (err) {
            status = 'anonymous';
            errorMsg = err.message;
        }
        dispatch(setUser({status, user, errorMsg}));
    }
}

export function signOut() {
    return async (dispatch, getState) => {
        let status;
        let {user} = userSelector(getState());
        let errorMsg;
        try {
            status = 'anonymous';
            user = await API.signOut();
        } catch (err) {
            errorMsg = err.message;
        }
        dispatch(setUser({status, user, errorMsg}));
    }
}

export function updateAttributes(attributes) {
    return async (dispatch, getState) => {
        const status = 'signedin';
        let {user} = userSelector(getState());
        let errorMsg;
        try {
            user = await API.updateAttributes(attributes);
        } catch (err) {
            errorMsg = err.message;
        }
        dispatch(setUser({status, user, errorMsg}));
    }
}
