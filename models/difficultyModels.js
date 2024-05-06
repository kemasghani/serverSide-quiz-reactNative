import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Difficulty = db.define('Difficulty', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,
    tableName: "difficulty"
});

Difficulty.sync()

export default Difficulty;
