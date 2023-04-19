import styles from './ListItem.module.css';

const ListItem = (props) => {
    // props
    const { 
        clickHandler,
    } = props;

    return (
        <li onClick={clickHandler} className={styles['list-item-component']}>
            {props.children}
        </li>
    );
};

export default ListItem;