const sequelize = require('./db_engin');
const { DataTypes } = require('sequelize');
const User = require('./users');

const abanoub = User.build({
    firstname: 'Abanoub',
    lastname: 'Elias',
    role: 'student',
    email: 'abanoubsamy23412@gmail.com',
});

abanoub.save().then(() => {
    console.log('Abanoub was saved to the database!');
    console.log(abanoub.getFullName());
    console.log(abanoub.toJSON());
    sequelize.close();
}).catch((error) => {
    console.error('Error saving Abanoub to the database: ', error);
})