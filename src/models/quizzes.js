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

class Quiz extends Model {}

Quiz.init('Quiz', {
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
    teacher_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    },
    }, {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizzes'
    }
)

module.exports = Quiz;