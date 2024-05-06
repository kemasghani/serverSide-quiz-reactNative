// Import Sequelize dan koneksi database
import { DataTypes, Sequelize } from 'sequelize';
import db from '../config/database.js';

// Definisikan model Category
const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false
});


// Sinkronisasi model dengan basis data (opsional)
Category.sync();

// Export model Category
export default Category;
