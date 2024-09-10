// Making the model for tags
/* 
Table tags {
  id uuid [primary key]
  content text
  quiz_id uuid [not null]
}

*/

const sequelize = require('./db_engin');
const { DataTypes, Model } = require('sequelize');
const Quiz = require('./quizzes');

class Tag extends Model {}
Tag.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'quizzes',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
})

Quiz.hasMany(Tag, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
});
Tag.belongsTo(Quiz, {
    foreignKey: 'quiz_id'
});


module.exports = Tag;