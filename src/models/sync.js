// making the sync process for the database

const sequelize = require('./db_engin');
const User = require('./users');
const User_Classroom = require('./users_classrooms');
const Classrooms = require('./classrooms');
const Quiz = require('./quizzes');
const Question = require('./questions');
const Answer = require('./answers');
const Announcement = require('./announcemnets');
const MultipleChoiceOption = require('./multiple_choice_options');
const Tag = require('./tags');

async function syncDataBases(){
    sequelize.sync({ force: true }).then(() => {
        console.log('All tables have been created');
    }).catch ((error) => {
        console.log('Unable to create tables:', error);
    }).finally(() => {
        sequelize.close();
    });
}

syncDataBases();
module.exports = syncDataBases;