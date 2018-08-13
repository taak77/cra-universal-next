import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from "./actions/user";
import userSelector from './selectors/userSelector';
import logo from './logo.svg';
import styles from './Header.module.css';

const navRoutes = [
    {to: '/', label: 'Home', exact: true},
    {to: '/about', label: 'About', exact: false}
];

class Header extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        user: PropTypes.object
    };
    onLogout = (event) => {
        event.preventDefault();
        this.props.dispatch(signOut());
    };
    render() {
        const {user: {user}} = this.props;
        console.log('Header', user);
        return (
            <header className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo2" data-user={user}/>
                <ul className={styles.nav}>
                    {navRoutes.map(({to, label, exact}) => (
                        <li key={label} className={styles.navItem}>
                            <NavLink
                                to={to}
                                exact={exact}
                                className={styles.link}
                                activeClassName={styles.activeLink}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        <NavLink
                            to="/login"
                            className={styles.link}
                            activeClassName={styles.activeLink}
                            onClick={this.onLogout}
                        >
                            Log Out
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/login"
                            className={styles.link}
                            activeClassName={styles.activeLink}
                        >
                            Log In
                        </NavLink>
                    )}
                </ul>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

export default connect(mapStateToProps)(Header);
