import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.css';

class Content extends Component {
    static propTypes = {
        children: PropTypes.node
    }
	render() {
		return (
			<div id="content" className={styles.container}>
				{this.props.children}
			</div>
		);
	}
}

export default Content;
