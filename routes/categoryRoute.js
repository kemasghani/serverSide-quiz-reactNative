import express from 'express';
import { getCategories } from '../controllers/categoryController.js'; 

// Inisialisasi router
const router = express.Router();

// Endpoint untuk mendapatkan daftar kategori soal
router.get('/categories', getCategories);

// Export router agar dapat digunakan di file lain
export default router;
