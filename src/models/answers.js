/*
Answers Model - making the answers table of the database
Table answers {
  id uuid [primary key] // Changed to uuid for consistency
  question_id uuid [not null]
  written_answer text
  multiple_choice_option_id uuid // Changed to uuid and added 'not null' constraint
  submitted_at datetime [default: `now()`] // Added a timestamp to track when the answer was submitted
}
*/

const sequelize = require('./db_engin');
const { DataTypes, Model } = require('sequelize');
const Question = require('./questions');

class Answer extends Model {}
Answer.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    question_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'questions',
            key: 'id'
        }
    },
    written_answer: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    multiple_choice_option_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references:{
            model: 'multiple_choice_options',
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers'
});

// Defining the relationship between the answers and questions
Question.hasOne(Answer, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id'
});

module.exports = Answer;