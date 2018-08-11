import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.svg';
import styles from './Header.module.css';

const navRoutes = [
	{ to: '/', label: 'Home', exact: true },
	{ to: '/login', label: 'Login', exact: false },
	{ to: '/signup', label: 'Signup', exact: false },
	{ to: '/about', label: 'About', exact: false }
];

class Header extends Component {
	render() {
		return (
			<header className={styles.container}>
				<img src={logo} className={styles.logo} alt="logo2" />
				<ul className={styles.nav}>
					{navRoutes.map(({ to, label, exact }) => (
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
				</ul>
			</header>
		);
	}
}

export default Header;
