import { Sequelize } from "sequelize";

const db = new Sequelize('smarta', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;