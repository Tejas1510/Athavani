import mongoose from 'mongoose';

const mailSubscribersSchema = mongoose.Schema({
    email: String
});

var MailSubscibers = mongoose.model('MailSubscibers', mailSubscribersSchema);

export default MailSubscibers;