/*
Announcements model - making here the model for the announcements table in the database.
Table announcements {
  id uuid [primary key]
  classroom_id uuid [not null]
  content text
  created_at datetime [default: `now()`]
}
*/

const sequelize = require('./db_engin');
const { DataTypes, Model } = require('sequelize');

class Announcement extends Model {}
Announcement.init( {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    classroom_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'classrooms',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { sequelize,
    modelName: "Announcement",
    tableName: 'announcements'
});

module.exports = Announcement;