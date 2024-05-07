import express from 'express';
import { packageController } from '../controllers/packageController.js';

const router = express.Router();

// Endpoint untuk mendapatkan daftar paket
router.get('/', packageController.getPackage);
router.get('/:category_id', packageController.getPackageCategory);

export default router;
