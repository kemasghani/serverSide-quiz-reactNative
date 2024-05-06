import Category from '../models/categoryModels.js';

// Controller untuk mendapatkan daftar kategori
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error); // Cetak kesalahan ke konsol server
        res.status(500).json({ msg: 'Internal server error' }); // Kirim respons dengan pesan kesalahan yang lebih umum
    }
};

