import React, { useEffect, useState } from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {toast} from 'react-toastify';
import {Link, Redirect, useHistory} from 'react-router-dom';
import styles from './SignIn.module.css';
import * as validator from '../../../utils/validator';
import * as api from '../../../api/index';
import {LinearProgress} from '@material-ui/core';
import GoogleSignin from '../gapiFrontend';

function SignIn(props) {

    useEffect(() => {
        props.setLogout(false);

        return () => {
            props.setLogout(true);
        }
    },[props])

    

    const history = useHistory();

    const [passwordHide, setPasswordHide] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    function tooglePassword() {
        setPasswordHide(password => !password);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signing_error,setSigning_error] = useState("");

    async function submitHandle(e) {
        e.preventDefault()
        if(validator.empty(email)) {
            return setSigning_error("Email Field is Empty!");
        }
        if(validator.empty(password)) {
            return setSigning_error("Password Field is Empty!");
        }

        if(!validator.email(email)) {
            return setSigning_error("Invalid Email!");
        }

        setIsLoading(true);

        try {
            const {data} = await api.signIn({email, password});
            console.log(data);
            setSigning_error(data.message);
            // console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsLoading(false);
            history.push('/');
        } catch(error) {
            if(error.response) {
                setSigning_error(error.response.data.message);
            } else if(error.request) {
                setSigning_error("Server is not Responding!");
                // console.log(error.request);
            } else {
                setSigning_error(error.message);
                // console.log(error.message);
            }
            setIsLoading(false);
        }
    }
    
    if (localStorage.getItem('token')) {
        return <Redirect to="/" />
    }

    return (
        <div className={styles.SignIn}>
            <div className={styles.SignImage}>
                <img className={styles.Sign_image} src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_129714169_970647970450099_67857.jpg" alt="Memories Image"></img>
                <div className={styles.bg_color}></div>
            </div>
            <div className={styles.title}>SIGN IN</div>

            <div className={styles.body}>
                <form className={styles.form} onSubmit={submitHandle}>
                    <input type="text" className={styles.email} name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <div className={styles.password_container}>
                        <input type={`${passwordHide ? 'text': 'password'}`} className={styles.password} name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className={styles.eye} onClick={tooglePassword}>
                            {
                                passwordHide ? <FiEyeOff/> : <FiEye/>
                            }
                        </div>
                    </div>
                    <div className={styles.forgot}>
                        <Link to="/forgot">
                            Forgot your password?
                        </Link>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button 
                            className={styles.login}
                            onClick={submitHandle}
                            disabled={isLoading}
                            type="submit"
                            style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`}}
                        >
                            Log In
                            {
                                isLoading &&
                                <LinearProgress color="secondary" />
                            }
                        </button>                       
                    </div>
                    <div id = "signerror" style={{textAlign:'center',color:'coral',fontSize:19}}>{signing_error}</div>
                </form>
                <GoogleSignin />
                <div className={styles.already}>
                    {!isLoading && (
                        <>
                            <div className={styles.text}>New to Athavani?</div>
                            <div className={styles.link} disabled><Link to="/signup">Sign Up</Link></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignIn
