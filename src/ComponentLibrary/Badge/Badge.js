import styles from './Badge.module.css';

const Badge = (props) => {
    // props
    const { 
        type, 
        text, 
        className, 
        title,
    } = props;

    return (
        <div title={title} className={`${styles['badge-wrapper']} ${styles[type]} ${className}`}>
            {text}
        </div>
    );
};

export default Badge;