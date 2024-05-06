import Difficulty from '../models/difficultyModels.js';

// Controller untuk mendapatkan daftar tingkat kesulitan
export const getDifficulty = async (req, res) => {
    try {
        const difficulty = await Difficulty.findAll();
        res.status(200).json(difficulty);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
