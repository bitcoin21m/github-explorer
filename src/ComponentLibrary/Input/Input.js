import { useState } from 'react';
import styles from './Input.module.css';

const Input = (props) => {
    // props
    const { 
        type, 
        placeholder, 
        size, 
        changeHandler, 
        submitHandler,
    } = props;

    return (
        <input 
            className={`${styles['input-component']} ${styles[`input-${size}`]}`}
            type={type}
            onChange={changeHandler}
            onKeyDown={submitHandler}
            placeholder={placeholder}
        />
    );
};

export default Input;