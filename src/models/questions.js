/*
Questions Model - making here the model for the questions table in the database.
Table questions {
  id uuid [primary key] // Changed to uuid for consistency
  quiz_id uuid [not null] // Changed to uuid
  question_text text
  type Enum("multiple-choice", "written")
}
*/

const sequelize = require('./db_engin');
const { DataTypes, Model } = require('sequelize');
const Quiz = require('./quizzes');

class Question extends Model {}
Question.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'quizzes',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type : {
        type: DataTypes.ENUM('multiple-choice', 'written'),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions'
});


// Defining the relationship between the questions and quizzes
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
});
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id'
});


module.exports = Question;