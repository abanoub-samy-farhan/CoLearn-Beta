const sequelize = require('./db_engin');
const User = require('./users');

async function sync() {
    try {
        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.log('An error occurred:', error);
    }
}

sync();