import path from 'path';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';
import createStore from '../src/store';
import App from '../src/App';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../build')));

const injectHTML = (data, { html, title, meta, body, state, bundles = [] }) => {
	console.log('bundles', bundles)
	const bundleScripts = bundles.map(bundle => `<script src="${bundle.publicPath}"></script>`).join('');
	data = data.replace(
		'<div id="root"></div>',
		`<div id="root">${body}</div><script>window.__INITIAL_STATE__ = ${state}</script>`
	);
	//data = data.replace('</body>', bundleScripts + '</body>');

	return data;
};

const router = express.Router(); // eslint-disable-line
app.use(process.env.BASE_PATH, router);

router.get('*', (req, res) => {
	fs.readFile(
		path.resolve(__dirname, '../build/index.html'),
		'utf8',
		(err, htmlData) => {
			// If there's an error... serve up something nasty
			if (err) {
				console.error('Read error', err);

				return res.status(404).end();
			}

			const { store } = createStore(req.url);

			const context = {};
			const modules = [];
			const markup = renderToString(
				<Loadable.Capture report={moduleName => modules.push(moduleName)}>
					<Provider store={store}>
						<StaticRouter
							location={req.url}
							context={context}
						>
							<App/>
						</StaticRouter>
					</Provider>
				</Loadable.Capture>
			);

			if (context.url) {
				res.writeHead(301, {
					Location: context.url
				});
				res.end();
			} else {
				const bundles = getBundles(stats, modules).filter(bundle => (/\.(map|css)$/.exec(bundle.publicPath) === null));

				const html = injectHTML(htmlData, {
					body: markup,
					state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
					bundles
				});

				// We have all the final HTML, let's send it to the user already!
				res.send(html);
			}
		}
	);
});

const port = process.env.PORT || 3000;
Loadable.preloadAll().then(() => {
	app.listen(port, (err) => {
		if (err) {
			console.error(err);
		}

		console.log(`App listening on port ${port}`);
	});
});