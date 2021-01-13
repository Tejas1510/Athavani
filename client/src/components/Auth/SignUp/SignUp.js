import React, { useState } from 'react';
import {toast} from 'react-toastify';
import {Link, useHistory} from 'react-router-dom';
import styles from './SignUp.module.css';
import * as validator from '../../../utils/validator';
import * as api from '../../../api/index';

function SignUp() {

    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    async function submitHandle() {
        
        if(validator.empty(name)) {
            return toast.error("Name Field is Empty!");
        }
        if(validator.empty(email)) {
            return toast.error("Email Field is Empty!");
        }
        if(validator.empty(password)) {
            return toast.error("Password Field is Empty!");
        }
        if(validator.empty(password2)) {
            return toast.error("Confirm Password Field is Empty!");
        }
        
        if(!validator.email(email)) {
            return toast.error("Invalid Email!");
        }
        if(!validator.password(password)) {
            return toast.error("Password length must be more than 6.")
        }
        if(!validator.match(password, password2)) {
            return toast.error("Password and Confirm Password are not matching!")
        }

        try {
            const {data} = await api.signUp({name, email, password});
            console.log(data);
            toast.success(data.message);
            history.push('/signin');
        } catch(error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <div className={styles.SignUp}>
            <div className={styles.title}>Sign Up</div>
            <div className={styles.body}>
                <input type="text" name="name" placeholder="Your Name"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <input type="text" name="email" placeholder="Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" name="password" placeholder="Enter Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <input type="password" name="password2" placeholder="Confirm Password"
                    value={password2} onChange={(e) => setPassword2(e.target.value)}
                />
                <button className={styles.signup}
                    onClick={submitHandle}
                >Sign Up</button>
                <div className={styles.already}>
                    <div className={styles.text}>Already have an account?</div>
                    <div className={styles.link}><Link to="/signin">Sign In</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
