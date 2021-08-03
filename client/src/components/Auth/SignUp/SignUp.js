import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, Redirect, useHistory } from "react-router-dom";
import styles from "./SignUp.module.css";
import * as validator from "../../../utils/validator";
import * as api from "../../../api/index";
import { LinearProgress } from "@material-ui/core";
import image from "../../../assets/sign-up-cover.png";

function SignUp(props) {
  useEffect(() => {
    props.setLogout(false);

    return () => {
      props.setLogout(true);
    };
  }, [props]);

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error_signup, setError_signup] = useState("");

  async function sendOtpHandle(e) {
    e.preventDefault();
    if (validator.empty(email)) {
      return setError_signup("Email Field is Empty!");
    }
    if (!validator.email(email)) {
      return setError_signup("Invalid Email!");
    }

    setIsLoading(true);

    try {
      const { data } = await api.sendOtp({ email });
      console.log(data);
      setError_signup(data.message);
      setIsOtpSent(true);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setError_signup(error.response.data.message);
      } else if (error.request) {
        setError_signup("Server is not Responding!");
        // console.log(error.request);
      } else {
        setError_signup(error.message);
        // console.log(error.message);
      }
      setIsLoading(false);
    }
  }

  async function verifyOtpHandle(e) {
    e.preventDefault();
    if (validator.empty(otp)) {
      return setError_signup("OTP Field is Empty!");
    }

    setIsLoading(true);

    try {
      const { data } = await api.verifyOtp({ email, otp });
      // console.log(data);
      setError_signup(data.message);
      setIsOtpVerified(true);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setError_signup(error.response.data.message);
      } else if (error.request) {
        setError_signup("Server is not Responding!");
        // console.log(error.request);
      } else {
        setError_signup(error.message);
        // console.log(error.message);
      }
      setIsLoading(false);
    }
  }

  async function submitHandle(e) {
    e.preventDefault();
    if (validator.empty(name)) {
      return setError_signup("Name Field is Empty!");
    }
    if (validator.empty(password)) {
      return setError_signup("Password Field is Empty!");
    }
    if (validator.empty(password2)) {
      return setError_signup("Confirm Password Field is Empty!");
    }

    if (!validator.password(password)) {
      return setError_signup("Password length must be more than 6.");
    }
    if (!validator.match(password, password2)) {
      return setError_signup("Password and Confirm Password are not matching!");
    }

    setIsLoading(true);

    try {
      const { data } = await api.signUp({ name, email, password });
      // console.log(data);
      setError_signup(data.message);
      setIsLoading(false);
      history.push("/signin");
    } catch (error) {
      if (error.response) {
        setError_signup(error.response.data.message);
      } else if (error.request) {
        setError_signup("Server is not Responding!");
        // console.log(error.request);
      } else {
        setError_signup(error.message);
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

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.parent}>
      <div className="left-child-section">
        <div>
          {/* <p id={styles.desc}>
              Athavani/Memories is a place to save all
              <br /> your memories in a single place
              <br /> and rejoice them through the years.
            </p> */}
          <div>
            <img
              src={image}
              alt="Memories Image"
              style={{ width: "100%", height: "auto" }}
            ></img>
          </div>
        </div>
      </div>
      <div className="right-child-section">
        <div className={styles.SignUp} style={{ marginTop: "5%" }}>
          <div className={styles.SignImage}>
            <img
              className={styles.Sign_image}
              src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_129714169_970647970450099_67857.jpg"
              alt="Memories Image"
            ></img>
            <div className={styles.bg_color}></div>
          </div>
          <div className={styles.title}>SIGN UP</div>
          <div className={styles.body}>
            <form
              className={styles.form}
              onSubmit={isOtpSent ? resetHandle : sendOtpHandle}
            >
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isOtpSent}
              />
              {isOtpSent ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className={styles.send_otp} onClick={resetHandle}>
                    Change Email
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <button
                    type="submit"
                    className={styles.send_otp}
                    onClick={sendOtpHandle}
                    disabled={isLoading}
                    style={{
                      cursor: `${isLoading ? "not-allowed" : "pointer"}`,
                    }}
                  >
                    Send OTP
                    {isLoading && (
                      <LinearProgress display="none" color="secondary" />
                    )}
                  </button>
                </div>
              )}
              <div
                style={{
                  textAlign: "center",
                  fontSize: 19,
                  color: "coral",
                  marginTop: 15,
                }}
              >
                {error_signup}
              </div>
            </form>
            {isOtpSent && !isOtpVerified && (
              <form onSubmit={verifyOtpHandle}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.send_otp}
                    onClick={verifyOtpHandle}
                    disabled={isLoading}
                    style={{
                      cursor: `${isLoading ? "not-allowed" : "pointer"}`,
                    }}
                  >
                    Verifiy OTP
                    {isLoading && <LinearProgress color="secondary" />}
                  </button>
                </div>
              </form>
            )}
            {isOtpVerified && (
              <form onSubmit={submitHandle}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <div className={styles.password_container}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <div
                    className={styles.eye}
                    onClick={() => setShowPassword(prevState => !prevState)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>

                <div className={styles.password_container}>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                  />
                  <div
                    className={styles.eye}
                    onClick={() => setShowPassword2(prevState => !prevState)}
                  >
                    {showPassword2 ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    type="submit"
                    className={styles.signup}
                    onClick={submitHandle}
                    disabled={isLoading}
                    style={{
                      cursor: `${isLoading ? "not-allowed" : "pointer"}`,
                    }}
                  >
                    Sign Up
                    {isLoading && <LinearProgress color="secondary" />}
                  </button>
                </div>
              </form>
            )}
            <div className={styles.already}>
              <div className={styles.text}>Already have an account?</div>
              <div className={styles.link}>
                <Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
