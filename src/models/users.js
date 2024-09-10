/* 
User BaseModel: the model for the user table in the 

User Table Schema:
Table users {
  id uuid [primary key]
  firstname varchar
  lastname varchar
  role Enum("teacher", "student", "admin") // Added 'admin' role for potential admin functionalities
  email varchar [unique] // Ensuring unique emails for each user
  created_at datetime [default: `now()`] // Adding created_at for tracking user registration time
  updated_at datetime [default: `now()`] // Adding updated_at for tracking updates to user profiles
}
*/
require('dotenv').config();
const sequelize = require('./db_engin')
const { DataTypes, Model} = require('sequelize');

class User extends Model {
    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('teacher', 'student', 'admin'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
})
// making a test user to test the model

module.exports = User;