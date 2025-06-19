import express from 'express';
import { getConversations } from '../Controller/conversation.controller.js';
import { isAuthenticated } from '../middleware/user.auth.middleware.js';
const router = express.Router();
router.get('/get',isAuthenticated, getConversations);

export default router