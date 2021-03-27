import React, { useState,useEffect } from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {toast} from 'react-toastify';
import {Link, useHistory} from 'react-router-dom';
import styles from './SignUp.module.css';
import * as validator from '../../../utils/validator';
import * as api from '../../../api/index';
import {LinearProgress} from '@material-ui/core';

function SignUp(props) {

    useEffect(() => {
        props.setLogout(false);

        return () => {
            props.setLogout(true);
        }
    },[props])


    const history = useHistory();

    const  [showPassword, setShowPassword] = useState(false);
    const  [showPassword2, setShowPassword2] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [otp, setOtp] = useState(""); 
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    async function sendOtpHandle() {
        if(validator.empty(email)) {
            return toast.error("Email Field is Empty!");
        }
        if(!validator.email(email)) {
            return toast.error("Invalid Email!");
        }

        setIsLoading(true);

        try {
            const {data} = await api.sendOtp({email});
            console.log(data);
            toast.success(data.message);
            setIsOtpSent(true);
            setIsLoading(false);
            
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

    async function verifyOtpHandle() {
        if(validator.empty(otp)) {
            return toast.error("OTP Field is Empty!");
        }

        setIsLoading(true);

        try {
            const {data} = await api.verifyOtp({email, otp});
            // console.log(data);
            toast.success(data.message);
            setIsOtpVerified(true);
            setIsLoading(false);
        } catch (error) {
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

    async function submitHandle() {
        if(validator.empty(name)) {
            return toast.error("Name Field is Empty!");
        }
        if(validator.empty(password)) {
            return toast.error("Password Field is Empty!");
        }
        if(validator.empty(password2)) {
            return toast.error("Confirm Password Field is Empty!");
        }
        
        if(!validator.password(password)) {
            return toast.error("Password length must be more than 6.");
        }
        if(!validator.match(password, password2)) {
            return toast.error("Password and Confirm Password are not matching!");
        }

        setIsLoading(true);

        try {
            const {data} = await api.signUp({name, email, password});
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

    function resetHandle() {
        setIsOtpSent(false);
        setIsOtpVerified(false);
        setOtp("");
    }

    return (
        <div className={styles.SignUp}>
            <div className={styles.title}>Sign Up</div>
            <div className={styles.body}>
                <input type="text" name="email" placeholder="Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    disabled={isOtpSent}
                />
                {
                    isOtpSent ?
                    <button className={styles.send_otp}
                        onClick={resetHandle}
                    >Change Email</button>
                    :
                    <button className={styles.send_otp}
                        onClick={sendOtpHandle}
                        disabled={isLoading}
                        style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`}}
                    >
                        Send OTP
                        {
                            isLoading &&
                            <LinearProgress color="secondary" />
                        }
                    </button>

                }
                {
                    isOtpSent && !isOtpVerified &&
                    <>
                        <input type="text" name="otp" placeholder="Enter OTP"
                            value={otp} onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className={styles.send_otp}
                            onClick={verifyOtpHandle}
                            disabled={isLoading}
                            style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`}}
                        >
                            Verifiy OTP
                            {
                                isLoading &&
                                <LinearProgress color="secondary" />
                            }
                        </button>
                    </>
                }
                {
                    isOtpVerified &&
                    <>
                        <input type="text" name="name" placeholder="Your Name"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                        <div className={styles.password_container}>
                            <input type={showPassword ? "text" : "password"}  name="password" placeholder="Enter Password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            /> 
                            <div className={styles.eye} onClick={()=> setShowPassword((prevState)=> !prevState)}>
                                {
                                    showPassword ? <FiEyeOff /> : <FiEye/>
                                }
                            </div>
                        </div>

                        <div className={styles.password_container}>
                            <input type={showPassword2 ? "text" : "password"}  name="password2" placeholder="Confirm Password"
                                value={password2} onChange={(e) => setPassword2(e.target.value)}
                            />
                            <div className={styles.eye} onClick={()=> setShowPassword2((prevState)=> !prevState)}>
                                {
                                    showPassword2 ? <FiEyeOff /> : <FiEye/>
                                }
                            </div>
                        </div>

                        <button className={styles.signup}
                            onClick={submitHandle}
                            disabled={isLoading}
                            style={{cursor: `${isLoading ? "not-allowed" : "pointer"}`}}
                        >
                            Sign Up
                            {
                                isLoading &&
                                <LinearProgress color="secondary" />
                            }
                        </button>
                    </>
                }
                <div className={styles.already}>
                    <div className={styles.text}>Already have an account?</div>
                    <div className={styles.link}><Link to="/signin">Sign In</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
