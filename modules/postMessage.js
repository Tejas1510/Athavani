import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: {
    _id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is Required"],
    },
    name: {
      type: String,
      required: [true, "Creator Name is Required"],
    },
  },
  tags: [String],
  selectedFile: String,
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      img: {
        type: String,
      },
      name: {
        type: String,
        required: [true, "Creator Name is Required"],
      },
      message: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: new Date()
      },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
