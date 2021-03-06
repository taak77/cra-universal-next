import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Home = Loadable({
	loader: () => import(/* webpackChunkName: "home" */ '../Home'),
	loading: () => null,
});

const Signup = Loadable({
	loader: () => import(/* webpackChunkName: "signup" */ '../Signup'),
	loading: () => null,
});

const Login = Loadable({
	loader: () => import(/* webpackChunkName: "login" */ '../Login'),
	loading: () => null,
});

const About = Loadable({
	loader: () => import(/* webpackChunkName: "about" */ '../About'),
	loading: () => null,
});

const NotFound = Loadable({
    loader: () => import(/* webpackChunkName: "notfound" */ '../NotFound'),
    loading: () => null,
});

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/signup" component={Signup} />
		<Route path="/about" component={About} />
        <Route component={NotFound} />
	</Switch>
);

export default Routes;
