import express from 'express';
import { getPackage, getPackageCategory } from '../controllers/packageController.js';

const router = express.Router();

// Endpoint untuk mendapatkan daftar paket
router.get('/packages', getPackage);
router.get('/packages/:category_id', getPackageCategory);

export default router;
