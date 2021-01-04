import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import mailRoutes from './routes/mails.routes.js';
import dotenv from 'dotenv';
import { sendMail } from './scripts/mailSender.js';
import cron from 'node-cron';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();
app.use('/posts', postRoutes);
app.use('/mails', mailRoutes);
app.get('/', (req, res) => {
    res.send('This is a MERN stack Project to save all your Memories')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)))
    .catch((error) => console.log(error.message))
mongoose.set('useFindAndModify', false);

// sends the mail every sunday
cron.schedule('* * * * Sun', () => {
    sendMail();
});