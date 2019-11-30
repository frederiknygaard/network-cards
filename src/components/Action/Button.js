import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss'

const button = props => {

    const className = props.loading ? styles['button--loading'] : styles['button'];

    return (
        <div>
            <button className={className} type={props.type}>
                <span className={styles['button__loader']}><span></span><span></span><span></span><span></span></span>
                <span className={styles['button__text']}>{props.text}</span>
            </button>
        </div>
    )
}

button.propTypes = {
    text: PropTypes.string
}

export default button;