import { DataTypes, Sequelize } from "sequelize";
import db from '../config/database.js';

const user = db.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
});

const syncDB = async () => {
    try {
        await db.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDB();

export default user;
