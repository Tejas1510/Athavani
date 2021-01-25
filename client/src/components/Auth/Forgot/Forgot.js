import React, {useState, useEffect} from 'react';
import styles from './Forgot.module.css';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import * as validator from '../../../utils/validator';
import * as api from '../../../api/index';

function Forgot(props) {

    useEffect(() => {
        props.setLogout(false);

        return () => {
            props.setLogout(true);
        }
    },[props]);

    const history = useHistory();

    const [email, setEmail] = useState("");

    async function submitHandle() {
        if(validator.empty(email)) {
            return toast.error("Email Field is Empty!");
        }

        if(!validator.email(email)) {
            return toast.error("Invalid Email!");
        }

        try {
            const {data} = await api.forgot({email});
            // console.log(data);
            toast.success(data.message);
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
        }
    }

    return (
        <div className={styles.Forgot}>
            <div className={styles.title}>
                Forgot Password?
            </div>
            <div className={styles.body}>
                <input type="text" name="email" placeholder="Enter email" className={styles.email}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <button className={styles.reset}
                    onClick={submitHandle}
                >
                    Mail Reset Link
                </button>
                <Link to='/signin' className={styles.back}>
                    Back
                </Link>
            </div>
        </div>
    )
}

export default Forgot
