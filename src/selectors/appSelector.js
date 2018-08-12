import { createSelector } from 'reselect';

const appSelector = ({ app = {} }) => app;

export default createSelector(appSelector, (app) => app);

export const geoSelector = createSelector(appSelector, ({ country: { country = {} } = {} }) => country['iso_code']);