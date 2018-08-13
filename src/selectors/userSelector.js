import { createSelector } from 'reselect';

const userSelector = ({ user = {} }) => user;

export default createSelector(userSelector, (user) => user);

export const userStatusSelector = createSelector(userSelector, ({ status }) => status);
export const userErrorMsgSelector = createSelector(userSelector, ({ errorMsg }) => errorMsg);
