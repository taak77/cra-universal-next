import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import createStore from './store';
import appSelector from './selectors/appSelector';
import { fetchBootstrap } from './actions/app';
import 'normalize.css/normalize.css';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const { store, history } = createStore();
const appData = appSelector(store.getState());
// work around to get bootstrap data on app start
if (!Object.keys(appData).length) { // most likely dev mode only
    store.dispatch(fetchBootstrap())
        .then(renderApp);
} else { // production mode
    renderApp();
}

function renderApp() {
    const root = document.getElementById('root');
    const Application = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Frontload noServerRender>
                    <App />
                </Frontload>
            </ConnectedRouter>
        </Provider>
    );

    if (process.env.NODE_ENV === 'production') {
        Loadable.preloadReady().then(() => {
            hydrate(Application, root);
        });
    } else {
        render(Application, root);
    }
    // registerServiceWorker();
}
