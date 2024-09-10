require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
