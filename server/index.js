import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import mailRoutes from './routes/mails.routes.js';
import authRoutes from './routes/authentication.js';
import dotenv from 'dotenv';
import { sendMail } from './scripts/mailSender.js';
import cron from 'node-cron';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();
app.use('/posts', postRoutes);
app.use('/mails', mailRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('This is a MERN stack Project to save all your Memories')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)))
    .catch((error) => console.log(error.message))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', error => {
  console.log(error.message);
});

// sends the mail every sunday
cron.schedule('* * * * Sun', () => {
    sendMail();
});