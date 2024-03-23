import user from '../models/userModels.js'
import bcrypt from 'bcrypt';

export const getUsers = async (req,res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const response = await user.findOne({
            where:{
                email: req.params.email
            }
        });
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({
            email: email,
            password: hashedPassword
        });
        res.status(201).json({ msg: "User created successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server error" });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const users = await user.findOne({ where: { email } });

        // Jika pengguna tidak ditemukan
        if (!users) {
            return res.status(404).json({ msg: 'Email not found' });
        }

        // Verifikasi kata sandi
        const isPasswordValid = await bcrypt.compare(password, users.password);

        // Jika kata sandi tidak cocok
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        // Jika email dan kata sandi cocok, kirim balasan berhasil
        res.status(200).json({ msg: 'Login successful' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
}