
import Comment from '../models/Comment.js'
import tryCatch from "./utils/tryCatch.js";


export const createComment = tryCatch( async(req, res)=>{
  try {
    const comment = await Comment.create({
      message: req.body.message,
      name: req.body.name,
      timestamp: Date.now(),
      roomId: req.body.roomId
    });
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export const retrieveCommentHistory = tryCatch( async(req, res)=>{
  try {
  // const comments = await Comment.find({ roomId: req.params.roomId }).sort({ timestamp: -1 });
  const comments = await Comment.find()
  return res.status(200).json(comments);
  } catch (err) {
  return res.status(400).json({ error: err.message });
  }
  });
  







