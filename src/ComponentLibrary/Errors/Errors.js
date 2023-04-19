import styles from './Errors.module.css';
import * as constant from '../../Helpers/Constants';

const Errors = (props) => {
    // props
    const { 
        message,
    } = props;

    // determine what error message to display
    const getErrorContent = () => {
        let content;
        console.log(message)
        switch(message) {
            case "Not Found":
                content = constant.ERROR_USER_NOT_FOUND;
                break;
            case constant.ERROR_API_RATE_LIMIT:
                content = constant.ERROR_API_RATE_LIMIT;
                break;
            default:
                break;
        }

        return <p className={styles.error}>{content}</p>;
    };

    return getErrorContent();
};

export default Errors;