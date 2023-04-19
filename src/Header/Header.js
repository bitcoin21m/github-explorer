import styles from './Header.module.css';
import * as constant from '../Helpers/Constants';

const Header = () => {
    return (
        <div className={styles.headingWrapper}>
            {constant.TITLE_HEADER}
        </div>
    );
};

export default Header;