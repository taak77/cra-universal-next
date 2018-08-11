import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import About from './About';
// import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
		<Content>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/about" component={About} />
			</Switch>
		</Content>
      </div>
    );
  }
}

export default App;
