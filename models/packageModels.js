import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Package = db.define('package', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', // Nama tabel yang direferensikan
            key: 'id' // Nama kolom yang direferensikan di tabel categories
        }
    },
    difficulty_level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'difficulty', // Nama tabel yang direferensikan
            key: 'id' // Nama kolom yang direferensikan di tabel difficulty
        }
    }
}, {
    timestamps: false
});

export default Package;
