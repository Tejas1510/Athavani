import mongoose from "mongoose";
import PostMessage from "../modules/postMessage.js";
import User from "../modules/user.js";
import Signup from "../modules/signup.js";

export const getPost = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post Deleted Succesfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const { bool } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findById(id);
  let updatedPost = {};
  if (bool) {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $pull: { likes: userID } },
      { new: true }
    );
  } else {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userID } },
      { new: true }
    );
  }
  res.json(updatedPost);
};

export const dislikePost = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const { bool } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findById(id);
  let updatedPost = {};
  if (bool) {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $pull: { dislikes: userID } },
      { new: true }
    );
  } else {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $addToSet: { dislikes: userID } },
      { new: true }
    );
  }
  // console.log(updatedPost.dislikes)
  res.json(updatedPost);
};

export const favoritePost = async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const { bool } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findById(id);
  let updatedPost = {};
  if (bool) {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $pull: { favorites: userID } },
      { new: true }
    );
  } else {
    updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: userID } },
      { new: true }
    );
  }
  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { userID, message } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const user = await User.findById(userID);

  if (!user) {
    res.status(404).send(`No User with id: ${userID}`);
  }

  PostMessage.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        comments: { message, img: user.img, postedBy: user, name: user.name },
      },
    },
    { new: true }
  ).populate("comment.postedBy", "_id name").exec((err, updatedPost) => {
      if(err){
        res.status(404).send(`Error Occured!`);
      }
    //   console.log(updatedPost);
    res.json(updatedPost);
  });
  
};

export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  const { userID } = req.body;
//   console.log(commentId);
//   console.log(userID);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const user = await User.findById(userID);

  if (!user) {
    res.status(404).send(`No User with id: ${userID}`);
  }


  PostMessage.findByIdAndUpdate(
    id,
    {
      $pull: { comments: { _id: commentId } },
    },
    { new: true }
  ).populate("postedBy", "_id").exec((err, updatedPost) => {
    res.json(updatedPost);
  });

  //   let updatedPost = await PostMessage.findById(id);
  //   console.log(updatedPost);


};

export const signup = async (req, res) => {
  const user = req.body;
  const newUser = new Signup(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const test = async (req, res) => {
  try {
    const post = await PostMessage.find().populate("creator", "name");
    return res.json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
