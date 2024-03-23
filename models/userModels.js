import { DataTypes, Sequelize } from "sequelize";
import db from '../config/database.js';

const {DataTyoes} = Sequelize;

const user = db.define('users',{
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING

},{
    freezeTableName:true
});

export default user;

(async() => {
    await db.sync();
})();