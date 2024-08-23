/*
Making the association between the users and classrooms tables
*/

const User = require('./users');
const Classroom = require('./classrooms');
const sequelize = require('./db_engin');
const User_Classroom = sequelize.define('User_Classroom', {}, { timestamps: false });

User.belongsToMany(Classroom, { through: User_Classroom });
Classroom.belongsToMany(User, { through: User_Classroom });

module.exports = User_Classroom;
