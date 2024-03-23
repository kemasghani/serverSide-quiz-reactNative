import express from "express";
import {createUser, getUserByEmail, getUsers, loginUser} from '../controllers/userController.js'

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:email', getUserByEmail);
router.post('/users', createUser);
router.post('/login', loginUser);

export default router;