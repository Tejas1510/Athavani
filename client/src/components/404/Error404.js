import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Error404.module.css';

// material ui styles
import { makeStyles } from '@material-ui/core/styles';

// material ui components
import { CircularProgress, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loader: {
        margin: '0 1rem',
        "@media screen and (max-width: 800px)": {
            height: '0',
        }
    },
    errorText: {
        margin: '3rem',
        fontSize: '2.5rem',
        "@media screen and (max-width: 800px)": {
            fontSize: '1.7rem',
        }
    },
    goHomeButton: {
        padding: '1.2rem',
        margin: '1rem auto',
        border: '1px solid black',
        borderRadius: '25px',
        '&:hover': {
            color: 'white',
            backgroundColor: '#ffa500',
            borderRadius: '25px',
        },
        "@media screen and (max-width: 800px)": {
            padding: '0.8rem',
            margin: '0.8rem auto',
            borderRadius: '20px',
        },
    }
}))

function Error404() {

    const classes = useStyles();
    const history = useHistory();


    return (
        <div className={styles.Error404}>
            <div className={styles.text_404}>
                <span className={styles.number}>4</span>
                <CircularProgress
                    variant='indeterminate'
                    color='secondary'
                    className={classes.loader}
                    size={100}
                    thickness={7}
                />
                <span className={styles.number}>4</span>
            </div>
            <Typography
                className={classes.errorText}
                align='center'
                variant='h3'
                gutterBottom
            >
                The page you are looking for is <strong>Not Available</strong>.
            </Typography>

            <Button
                variant="contained"
                color='secondary'
                className={classes.goHomeButton}
                onClick={() => { history.push("/"); }}
            >
                <Typography variant="h5">
                    Go Home
                </Typography>
            </Button>
        </div>
    )
}

export default Error404;
