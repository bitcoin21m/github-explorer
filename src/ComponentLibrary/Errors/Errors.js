import styles from './Errors.module.css';
import { ERROR_USER_NOT_FOUND, ERROR_API_RATE_LIMIT } from '../../Helpers/Constants';

const Errors = (props) => {
    // props
    const { 
        message,
    } = props;

    // determine what error message to display
    const getErrorContent = () => {
        let content;
        switch(message) {
            case "Not Found":
                content = ERROR_USER_NOT_FOUND;
                break;
            case ERROR_API_RATE_LIMIT:
                content = ERROR_API_RATE_LIMIT;
                break;
            default:
                break;
        }

        return <p className={styles.error}>{content}</p>;
    };

    return getErrorContent();
};

export default Errors;
