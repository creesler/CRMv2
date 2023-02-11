


// import { Router } from 'express';
import express from 'express';
import { createComment, retrieveCommentHistory } from '../controllers/comments.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import roomPermissions from '../middleware/permissions/room/roomPermissions.js';

// const Router = express.Router()

const commentRouter = express.Router();
commentRouter.post('/', createComment);
commentRouter.get('/', retrieveCommentHistory);


export default commentRouter;