import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';
import Routes from './routes';
import ErrorBoundary from './ErrorBoundary';
import {geoSelector} from './selectors/appSelector';
import {getCurrentUser} from "./actions/user";
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './App.module.css';

class App extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    };
    componentDidMount() {
        this.context.store.dispatch(getCurrentUser());
    }
    render() {
        // FIXME:
        // this is an examples of accessing store data in application wrapper level
        // since `react-loadable` doesn't work when parent component is connected.
        const { store } = this.context;
        const geo = geoSelector(store.getState());
        return (
            <div data-geo={geo}>
                <Header/>
                <ErrorBoundary>
                    <Content>
                        <Routes/>
                    </Content>
                </ErrorBoundary>
            </div>
        );
    }
}

//export default connect(mapStateToProps)(App);
export default App;
