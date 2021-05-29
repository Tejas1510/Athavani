import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import {toast} from 'react-toastify';
import { useDispatch } from "react-redux";
import { addMail } from "../../actions/mails";
import * as validator from '../../utils/validator';

import './Style.css';
const MailForm = () => {
    const [mailPostData, setMailPostData] = useState({ email: '' });
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        if(validator.empty(mailPostData.email)) {
            return toast.error("Email Field is Empty!");
        }
        if(!validator.email(mailPostData.email)) {
            return toast.error("Invalid Email!");
        }
        e.preventDefault();
        dispatch(addMail(mailPostData)).then(() => {
            toast.info("Subscribed!");
        });
        clear();
    }
    const clear = () => {
        setMailPostData({ email: '' });
    }

    return (
        <Paper style={{
            marginTop: '0',
            borderRadius: '5px',
            background: 'linear-gradient(180deg, rgb(255 192 146 / 85%) 48%, rgb(253 226 52 / 0.71) 100%)'
        }}>
            <div id="container">
                <h2>Subscribe</h2>
                <p>Stay updated with our newsletter</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Type your Email"
                        value={mailPostData.email}
                        onChange={(e) => setMailPostData({email: e.target.value})}
                    />
                    <br></br>
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Subscribe</button>
                </form>
            </div>
        </Paper>
    );
}
export default MailForm;