import express from "express";
import {createUser, getUserByEmail, getUsers} from '../controllers/userController.js'

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);

export default router;