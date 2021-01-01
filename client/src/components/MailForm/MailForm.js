import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMail } from "../../actions/mails";
import useStyles from './style';
const MailForm = () => {
    const [mailPostData, setMailPostData] = useState({ email: '' });
    const classes = useStyles();
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
            <form autoComplete="off" onSubmit={handleSubmit} /*className={classes.form}*/>
                <div>
                    <Typography variant="subtitle1" style={{ padding: '5px', color: 'rgba(179, 17, 17, 0.87)' }} align="left" >
                        Get a Random Memory every week. Subscibe now
                    </Typography>
                </div>
                <Grid container style={{ padding: '8px' }}>
                    <Grid item xs>
                        <TextField name="email" className={classes.root} 
                        variant="outlined" label="Email" value={mailPostData.email}
                        onChange={(e) => setMailPostData({ ...mailPostData, email: e.target.value })} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button style={{
                            marginBottom: 10,
                            background: '#FFB800',
                            color: 'white',
                            borderRadius: '7px',
                            width: '70px',
                            padding: '14px',
                            marginLeft: '8px',
                        }} variant="contained" type="submit">submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
export default MailForm;