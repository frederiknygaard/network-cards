import React from 'react';

import styles from './Button.scss'

const button = props => (
    <button className={styles['button']} type={props.type}>{props.text}</button>
)

export default button;
