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
        const {user: {isLoggedIn, attributes: {username, email} = {}}} = this.props;
        return (
            <header className={styles.container}>
                <img src={logo} className={styles.logo} alt="logo2"/>
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
                    <li className={styles.navItem}>
                        {isLoggedIn ? (
                            <NavLink
                                to="/login"
                                className={styles.link}
                                onClick={this.onLogout}
                            >
                                Log Out ({username || email})
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
                    </li>
                </ul>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    user: userSelector(state)
});

export default connect(mapStateToProps)(Header);
