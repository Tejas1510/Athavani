import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMail } from "../../actions/mails";

import './Style.css';
const MailForm = () => {
    const [mailPostData, setMailPostData] = useState({ email: '' });
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addMail(mailPostData));
        clear();
    }
    const clear = () => {
        setMailPostData({ email: '' });
    }

    return (
        <Paper style={{
            marginTop: '10px',
            borderRadius: '12px',
            background: 'linear-gradient(180deg, rgb(255 192 146 / 85%) 48%, rgb(253 226 52 / 0.71) 100%)'
        }}>
    <div id="container">
	<h2>Subscribe</h2>
	<p>Stay updated with our newsletter</p>
	    <form>
		<input type="email" placeholder="Type your Email" required/>
			<br/>
		<button>Subscribe</button>
	    </form>
        </div>
        </Paper>
    );
}
export default MailForm;