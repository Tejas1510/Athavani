import React, { useState } from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import styles from './SignIn.module.css';
import * as validator from '../../../utils/validator';

function SignIn() {

    const [passwordHide, setPasswordHide] = useState(false);

    function tooglePassword() {
        setPasswordHide(password => !password);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submitHandle() {

        if(validator.empty(email)) {
            return toast.error("Email Field is Empty!");
        }
        if(validator.empty(password)) {
            return toast.error("Password Field is Empty!");
        }

        if(!validator.email(email)) {
            return toast.error("Invalid Email!");
        }

        toast.success("Validation Pass!");
    }

    return (
        <div className={styles.SignIn}>
            <div className={styles.title}>Sign In</div>
            <div className={styles.body}>
                <input type="text" className={styles.email} name="email" placeholder="Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.password_container}>
                    <input type={`${passwordHide ? 'text': 'password'}`} className={styles.password} name="password" placeholder="Enter Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.eye} onClick={tooglePassword}>
                        {
                            passwordHide ? <FiEyeOff /> : <FiEye/>
                        }
                    </div>
                </div>
                <div className={styles.forgot}>Forgot your password?</div>
                <button className={styles.login}
                    onClick={submitHandle}
                >Log In</button>
                <div className={styles.already}>
                    <div className={styles.text}>New to Realate?</div>
                    <div className={styles.link}><Link to="/signup">Sign Up</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
