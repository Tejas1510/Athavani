/* global gapi */

import React, { Component } from 'react';
import * as api from '../../api/index';
import {toast} from 'react-toastify';
import {Redirect, withRouter} from 'react-router-dom';
import dotenv from 'dotenv';
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
//import { firebase } from "./../../utils/firebase";


dotenv.config(); // this is to be installed in the node modules so CLIENT_ID could be used for Google Signin
// The following CLIENT_ID is used to initialize the Google Signin APIs
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
 
// The following is the GoogleSignin React Class which handels majority of the functionality of Sign in button
class GoogleSignin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            idToken: ""
        };
        // console.log("inside constructor", this); Use for Debugging
    };
    
    insertGapiScript(){ //this function adds the Google API script on the go when the sign in button is mounted onto the signin page

        // console.log("Inside IGAS") Use for Debugging
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.onload = () => {
            this.initializeGoogleSignIn();
        };
        document.body.appendChild(script);
    };

    initializeGoogleSignIn(){ //this function initializes the Google APIs after the script is loaded perfectly

        window.gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: CLIENT_ID
            });

            window.gapi.load('signin2', () => {
                const params = {
                    width: 200,
                    height: 50,
                    onsuccess: () => {
                        // console.log(gapi.auth2.getAuthInstance().isSignedIn.get()); Use for Debugging
                        this.setState({
                            isSignedIn: true
                        });
                        this.signIn();
                    } 
                };
                gapi.signin2.render('G-loginButton', params); //this renders the button onto the page
            });
        });
    };

    signIn(){ // Once the useer is signed in correctly then it stores the user id token on the state

        // console.log("inside signin "); Use for Debugging
        var currentComponent = this;
        window.gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: CLIENT_ID
            }).then(function (auth2){
                // var userStatus = auth2.isSignedIn.get(); Use for Debugging
                // console.log(userStatus); Use for Debugging
                var googleUser = auth2.currentUser.get();
                var authResponse = googleUser.getAuthResponse();
                var token = authResponse.id_token;
                // var googleReturnedData = googleUser.getBasicProfile(); Use for Debugging
                // console.log(currentComponent); Use for Debugging
                currentComponent.setState({
                    idToken: token
                });
                // console.log("id token: ", currentComponent.state.idToken); Use for Debugging
                // console.log('authResponse', authResponse); Use for Debugging
                // console.log(currentComponent.state); Use for Debugging
                currentComponent.googleDataSend();
            });
        });
    };

    componentDidMount(){ // this runs only when the sigin button is mounted onto the signin page

        // console.log("Inside CDM");  Use for Debugging
        this.insertGapiScript();  
    };

    async googleDataSend(){ // this funtion handels the user data on the state and sends it to the backend through axios defined in ../api/index.js

        const { history } = this.props;
        if(history) {
            try {
                // console.log("inside google data send"); Use for Debugging
                history.push("/signin/Gsignin");
                const idToken = this.state.idToken;
                const userData = {
                    idToken
                };
                // console.log("user Data", userData.idToken) Use for Debugging
                const { data } =  await api.Gsignin(userData);
                console.log(data);
                toast.success(data.message);
                console.log(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // console.log("it worked!!!"); Use for Debugging
                history.push('/');
            }catch(error) {
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
    }

    getContent() { // this returns the signin button or redirects to homepage depending upon user status
        if (localStorage.getItem('token')) {

            return <Redirect to="/" />

        }else{

            if (!this.state.isSignedIn) {
                /** For firebase login-------(uncomment this to enable firebase login and enter your firebase credentials to login)
                const uiConfig = {
                    signInFlow: "popup",
                    signInSuccessUrl: "/",
                    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
                  };
                // console.log("not signed in.."); Use for Debugging
                return (
                    <div>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                    </div>
                )
                 */

                /**
                For Logout--add this button where you want to work with log-out button
                <button
                    onClick={function () {
                    firebase.auth().signOut();
                    }}
                >
                Logout
                </button> */
            }
        } 
    }
              
    render() { 

        return ( 
            <div>
                {this.getContent()}
            </div> 
         )
    }
}

function SignOutGoogle(){ // this is called by the signout() in app.js of client folder. Basically sign out the user from our app

    // console.log("Inside signout"); Use for Debugging
    window.gapi.load('auth2' , () => {
        gapi.auth2.init({
            client_id: CLIENT_ID
        }).then(function (authResult){
            var userStatus = authResult.isSignedIn.get();
            if(userStatus){ 
                authResult.signOut();
                // console.log("user status", userStatus); Use for Debugging
            }
        })
    })
}

export { SignOutGoogle };
export default withRouter(GoogleSignin);