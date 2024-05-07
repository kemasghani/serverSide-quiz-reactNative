import express from "express";
const userController = require("../controller/UserController");

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.createUser);

// Route for user login
router.post('/login', userController.loginUser);

export default router;
