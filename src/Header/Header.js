import styles from './Header.module.css';
import { TITLE_HEADER } from '../Helpers/Constants';

const Header = () => {
    return (
        <div className={styles.headingWrapper}>
            {TITLE_HEADER}
        </div>
    );
};

export default Header;