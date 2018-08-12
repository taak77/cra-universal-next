import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import createStore from './store';
import 'normalize.css/normalize.css';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const { store, history } = createStore();
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
