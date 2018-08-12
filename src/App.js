import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Content from './Content';
import Routes from './routes';
import { frontloadConnect } from 'react-frontload';
import { fetchBootstrap } from './actions/app';
import { geoSelector } from './selectors/appSelector';
// import styles from './App.module.css';

const frontload = ({ dispatch }) => {
	return dispatch(fetchBootstrap());
};

class App extends Component {
  render() {
    return (
      <div data-geo={this.props.geo}>
        <Header />
		<Content>
			<Routes />
		</Content>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	geo: geoSelector(state)
});

export default connect(mapStateToProps)(frontloadConnect(frontload, {
	onMount: true,
	onUpdate: false
})(App));
