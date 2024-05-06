import Package from '../models/packageModels.js';

// Controller untuk mendapatkan daftar paket
export const getPackage = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getPackageCategory = async (req, res) => {
    try {
        const category_id = req.params.category_id;
        const packages = await Package.findAll({
            where: {
                category_id: category_id
            }
        });
        res.status(200).json(packages);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
};