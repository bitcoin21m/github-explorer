import { useEffect, useState } from 'react';
import styles from './Loader.module.css';
import { EMPTY_STRING } from '../../Helpers/Constants';

const Loader = () => {
    // states
    const [loadAnimation, setLoadAnimation] = useState(EMPTY_STRING);

    // initialization of loading animation
    useEffect(() => {
        const loadInterval = setInterval(() => {
            setLoadAnimation(prev => {
                if(prev?.length > 4) {
                    return '.';
                } else {
                    return prev + '.'
                }
            });
        }, 150);

        // clear out interval on unmount
        return () => {
            clearInterval(loadInterval);
        };
    }, []);

    return (
        <div className={styles['loader-overlay']}>
            <div className={styles['loader-content']}>
                <p className={styles['load-text']}>Hang tight while we grab the data</p>
                {loadAnimation}
            </div>
        </div>
    );
};

export default Loader;