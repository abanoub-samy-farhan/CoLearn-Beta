/*
Making the association between the users and classrooms tables
*/

const User = require('./users');
const Classroom = require('./classrooms');
const sequelize = require('./db_engin');
const User_Classroom = sequelize.define('User_Classroom', {}, { timestamps: false, tableName: 'users_classrooms' });

User.belongsToMany(Classroom, { through: User_Classroom, 
    foreignKey: 'user_id',
});
Classroom.belongsToMany(User, { through: User_Classroom 
    , foreignKey: 'classroom_id'
});

module.exports = User_Classroom;
