import mongoose from 'mongoose';
import MailSubscibers from '../modules/mailSubscribers.js';

export const addMail = async (req, res) => {
    console.log(req.body);
    const newSubscriber = new MailSubscibers(req.body);
    try {
        await newSubscriber.save();
        console.log(newSubscriber);
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const removeMail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No subscriber with id: ${id}`);
    try {
        await MailSubscibers.findByIdAndRemove(id);
        res.status(200).json({ message: 'Unsubscribed Succesfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getMails = async (req, res) => {
    try {
        const Subscribers = await MailSubscibers.find();
        res.status(200).json(Subscribers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
