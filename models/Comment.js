import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
message: {
type: String,
required: true
},
name: {
type: String,
required: true
},
timestamp: {
type: Date,
required: true
},
roomId: {
type: mongoose.Types.ObjectId,
ref: 'Room',
required: true,
comments: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Comment'
}]
}
});






const Comment = mongoose.model('Comment', CommentSchema);

export default Comment