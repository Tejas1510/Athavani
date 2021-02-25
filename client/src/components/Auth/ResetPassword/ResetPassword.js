import React, {useState,useEffect} from 'react';
import styles from './ResetPassword.module.css';
import {toast} from 'react-toastify';
import {Link, useHistory, useParams} from 'react-router-dom';
import * as validator from '../../../utils/validator';
import * as api from '../../../api/index';
import {LinearProgress} from '@material-ui/core';

function ResetPassword(props) {

    useEffect(() => {
        props.setLogout(false);

        return () => {
            props.setLogout(true);
        }
    },[props])

    const history = useHistory();
    const params = useParams();

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function submitHandle() {
        if(validator.empty(password)) {
            return toast.error("Password Field is Empty!");
        }
        if(validator.empty(password2)) {
            return toast.error("Confirm Password Field is Empty!");
        }

        if(!validator.password(password)) {
            return toast.error("Password length must be more than 6.")
        }
        if(!validator.match(password, password2)) {
            return toast.error("Password and Confirm Password are not matching!")
        }

        setIsLoading(true);

        try {
            const {data} = await api.resetPassword({token: params.token, newPassword: password});
            // console.log(data);
            toast.success(data.message);
            setIsLoading(false);
            history.push('/signin');
        } catch(error) {
            if(error.response) {
                toast.error(error.response.data.message);
            } else if(error.request) {
                toast.error("Server is not Responding!");
                // console.log(error.request);
            } else {
                toast.error(error.message);
                // console.log(error.message);
            }
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.ResetPassword}>
            <div className={styles.title}>
                Reset Password
            </div>
            <div className={styles.body}>
                <input type="password" name="password" placeholder="Enter new Password" className={styles.password}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <input type="password" name="password2" placeholder="Enter Password Again" className={styles.password2}
                    value={password2} onChange={(e) => setPassword2(e.target.value)}
                />
                <button className={styles.change}
                    onClick={submitHandle}
                    disabled={isLoading}
                    style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`}}
                >
                    Change Password
                    {
                        isLoading &&
                        <LinearProgress color="secondary" />
                    }
                </button>
                <Link to='/forgot' className={styles.back}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default ResetPassword
