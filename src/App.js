import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';
import Routes from './routes';
// import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
		<Content>
			<Routes />
		</Content>
      </div>
    );
  }
}

export default App;
