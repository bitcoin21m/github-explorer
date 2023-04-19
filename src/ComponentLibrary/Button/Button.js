import styles from './Button.module.css';

const Button = (props) => {
    // props
    const { 
        type, 
        clickHandler, 
        name, 
        disabled,
    } = props;

    return (
        <button
            className={`${styles['button-component']} ${!disabled ? styles.active : styles.disabled}`}
            type={type}
            onClick={clickHandler}
        >
        {name}
        </button>
    );
};

export default Button;