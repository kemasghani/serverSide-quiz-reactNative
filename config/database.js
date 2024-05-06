import { Sequelize } from "sequelize";

const db = new Sequelize('smarta', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Nonaktifkan logging jika tidak diperlukan
});

// Uji koneksi ke database
async function testDBConnection() {
    try {
        await db.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testDBConnection();

export default db;
