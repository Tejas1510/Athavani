import React from 'react';
import {useHistory} from 'react-router-dom';
import styles from './Error404.module.css';

function Error404() {

    const history = useHistory();

    function toBack() {
        history.goBack();
    }

    return (
        <div className={styles.Error404}>
            <div className={styles.text_404}>
                <span className={styles.number}>4</span>
                <span className={styles.number}>0</span>
                <span className={styles.number}>4</span>
            </div>
            <div className={styles.text_not_found}>
                Page not Found
            </div>
            <button className={styles.button} onClick={toBack}>Go Back</button>
        </div>
    )
}

export default Error404;
