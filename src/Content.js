import React, { Component } from 'react';
import styles from './Content.module.css';

class Content extends Component {
	render() {
		return (
			<div id="content" className={styles.container}>
				{this.props.children}
			</div>
		);
	}
}

export default Content;
