/**
 * @module classroomRoutes
 * @route {GET} /classrooms - Get all classrooms
 * @route {POST} /classrooms - Create a new classroom
 */
const express = require('express');
const ClassroomRouter = express.Router();
const { createClassroom, 
    deleteClassroom, 
    getClassroomById, 
    updateClassroom, 
    getAllClassrooms, 
    getClassroomUsingCreatedByAttribute, 
    getClassroomAsscoiatedToUserId, 
    getUsersAssociatedToClassroom, 
    removeUserFromClassroom, 
    joiningClassroom
 } = require('../../utils/Controllers/classroomsController');

// Routes
// Classroom routes for handling the CRUD operations
ClassroomRouter.get('/', getAllClassrooms);
ClassroomRouter.get('/:id', getClassroomById);
ClassroomRouter.delete('/:id', deleteClassroom);
ClassroomRouter.post('/', createClassroom);
ClassroomRouter.put('/:id', updateClassroom);

// Classroom routes for handling the users associated to the classrooms
ClassroomRouter.get('/t/', getClassroomUsingCreatedByAttribute);
ClassroomRouter.get('/s/classrooms', getClassroomAsscoiatedToUserId);
ClassroomRouter.get('/t/:classroom_id/users', getUsersAssociatedToClassroom);
ClassroomRouter.delete('remove/:classroom_id/users/:user_id', removeUserFromClassroom);
ClassroomRouter.post('join/:classroom_id/users/:user_id', joiningClassroom);


// Exporting the ClassroomRouter
module.exports = ClassroomRouter;
