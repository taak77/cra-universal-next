import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';
import Routes from './routes';
import {geoSelector} from './selectors/appSelector';
// import styles from './App.module.css';

class App extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        // FIXME:
        // this is an examples of accessing store data in application wrapper level
        // since `react-loadable` doesn't work when parent component is connected.
        const { store } = this.context;
        const geo = geoSelector(store.getState());
        return (
            <div data-geo={geo}>
                <Header/>
                <Content>
                    <Routes/>
                </Content>
            </div>
        );
    }
}

//export default connect(mapStateToProps)(App);
export default App;
