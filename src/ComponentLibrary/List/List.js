import styles from './List.module.css';

const List = (props) => {
    return (
        <ul className={styles['list-component']}>
            {props.children}
        </ul>
    );
};

export default List;