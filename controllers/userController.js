import user from '../models/userModels.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await user.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const createUser = async (req, res) => {
    try {
        const {username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ where: { email } });
        if (!foundUser) {
            return res.status(404).json({ msg: 'Email not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid password' });
        }
        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
