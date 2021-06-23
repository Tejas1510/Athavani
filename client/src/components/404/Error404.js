import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Error404.module.css';

function Error404() {

    const history = useHistory();

    function toBack() {
        history.goBack();
    }
    function goHome() {
        history.push("/");
    }

    return (
        <div className={styles.Error404}>
            <div className={styles.text_404}>
                <span className={styles.number}>4</span>
                <span className={styles.number}>0</span>
                <span className={styles.number}>4</span>
            </div>
            <p className={styles.text_not_found}>
                The page you are looking for is <strong>Not Available</strong>.
            </p>
            <span>
                <button className={styles.button} onClick={goHome}>Go Home</button>
                <button className={styles.button} onClick={toBack}>Go Back</button>
            </span>
        </div>
    )
}

export default Error404;
