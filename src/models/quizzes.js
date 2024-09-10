/*
Quizzes Model - This model will be used to store the quizzes data in the database.
Table quizzes {
  id uuid [primary key] // Changed to uuid for consistency and scalability
  title varchar
  description text
  teacher_id uuid [not null]
  created_at datetime [default: `now()`]
}
*/

const sequelize = require('./db_engin');
const { DataTypes, Model } = require('sequelize');
const Classroom = require('./classrooms');
const User = require('./users');


class Quiz extends Model {}

Quiz.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    classroom_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'classrooms',
            key: 'id'
        }
    },
    teacher_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    },
    due_date: {
        type: DataTypes.DATE,
    }
    ,
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    classroom_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'classrooms',
            key: 'id'
        }}
    }, {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizzes'
    }
)


// Creating the relationship between the quizzes and the classrooms
Classroom.hasMany(Quiz, {
    foreignKey: 'classroom_id',
    onDelete: 'CASCADE'
});
Quiz.belongsTo(Classroom, {
    foreignKey: 'classroom_id'
});

// Creating the relationship between the quizzes and the users
User.hasMany(Quiz, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE'
});
Quiz.belongsTo(User, {
    foreignKey: 'teacher_id'
});

module.exports = Quiz;