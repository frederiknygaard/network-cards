import React from 'react';

import styles from './FormField.scss'

const formField = props => (
    <div className={styles['form-field']}>
        {props.label && 
            <label className={styles['form-field__label']} htmlFor={props.id}>{props.label}</label>
        }
        <input className={styles['form-field__input']} placeholder={props.placeholder} type={props.type} id={props.id} ref={props.inputRef} />
    </div>
)

export default formField;
