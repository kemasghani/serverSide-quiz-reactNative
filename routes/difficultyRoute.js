import express from 'express';
import { getDifficulty } from '../controllers/difficultyController.js';

const router = express.Router();

// Endpoint untuk mendapatkan daftar tingkat kesulitan
router.get('/difficulty', getDifficulty);

export default router;
