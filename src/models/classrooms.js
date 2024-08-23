/*
Classrooms model for the classrooms table in the database
Table classrooms {
  id uuid [primary key]
  description text
  classroom_name varchar
  created_by uuid [not null, ref: > users.id]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
}
*/

const sequelize = require('./db_engin');

const { DataTypes, Model } = require('sequelize');



class Classroom extends Model {}
Classroom.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    description:{
        type: DataTypes.TEXT,
    },
    classroom_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Classroom',
    tableName: 'classrooms'
})

module.exports = Classroom;