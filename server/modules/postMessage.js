import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is Required'],
    },
    tags: [String],
    selectedFile: String,
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
