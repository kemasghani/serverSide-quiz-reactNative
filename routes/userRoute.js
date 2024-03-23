import express from "express";
import {createUser, getUserById, getUsers, loginUser} from '../controllers/userController.js'

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/login', loginUser);

export default router;