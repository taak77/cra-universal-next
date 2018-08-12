import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Signup.module.css';

class Signup extends Component {
	render() {
		return (
			<div className={styles.container}>
				Signup
			</div>
		);
	}
}

export default connect()(Signup);
