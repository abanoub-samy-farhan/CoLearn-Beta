/**
 * MultipleChoiceOptions model - making here the model for the multiple_choice_options table in the database.
 * Table multiple_choice_options {
  id uuid [primary key] // Changed to uuid for consistency
  question_id uuid [not null, ref: > questions.id] // Changed to uuid
  content text
  is_correct boolean
}
 */

const sequelize = require('./db_engin');
const { DataTypes, Model} = require('sequelize');
const Question = require('./questions');

class MultipleChoiceOption extends Model {}
MultipleChoiceOption.init({
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
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {sequelize, modelName: "MultipleChoiceOption",tableName: 'multiple_choice_options'});

Question.hasMany(MultipleChoiceOption, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});
MultipleChoiceOption.belongsTo(Question, {
    foreignKey: 'question_id'
});

module.exports = MultipleChoiceOption;