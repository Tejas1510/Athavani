import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import MailSubscibers from '../modules/mailSubscribers.js';
import dotenv from 'dotenv';
import PostMessage from '../modules/postMessage.js';

// mailSender.js is loaded before index.js,
// so we have to config env and connect to mongoose here.
dotenv.config()
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });


//  if you are configuring your gmail account, 
//  check over here and allow access to your account for following :
//  https://stackoverflow.com/a/41862069

const getMails = async () => {
    try {
        return await MailSubscibers.find();
    } catch (error) {
        console.log(error.message);
    }
}

const getPost = async () => {
    try {
        return await PostMessage.find();
    } catch (error) {
        console.log(error.message);
    }
}

const random = (min, max) => {
    return ~~(Math.random() * (max - min + 1) + min);
}


export const sendMail = async () => {
    var postList = [];
    await getPost()
        .then((posts) => postList = posts);

    var mailList = [];
    await getMails()
        .then((mails) => mailList = mails.map((mail) => mail.email));

    var idx = random(0, postList.length-1);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: process.env.MAIL,
        to: mailList,
        subject: 'Athavani - Weekly Memory',
        html: '<h1>' + JSON.stringify(postList[idx]) + '</h1>'
    };

    return transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.log(error);
            console.log(info);
    });
}