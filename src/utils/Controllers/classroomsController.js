/**
 * Classrooms Controller for handling the classrooms routes, including the CRUD operations and other operations
 * @module ClassroomsController
 * @function getAllClassrooms - GET all classrooms from the database
 * @function getClassroomById - GET classrooms by ids
 * @function deleteClassroomById - DELETE classroom by using id
 * @function updateClassroomById - PUT classroom new data instead of the old data
 * @function createClassroom - POST classroom data for creating new classroom
 * --------- Getting Classrooms associated to specific users ---------
 * @function getClassroomByCreatedByAttribute - GET classrooms asscoiated to a specific teacher
 * @function getClassroomAsscoiatedToUserId - GET classrooms asscoiated to a specific student user
 * @function getUsersAssociatedToClassroom - GET users associated to a specific classroom
 * @function removeUserFromClassroom - DELETE users from a classroom
 * @function joiningClassroom - Joining new classroom by using classroom code
 */

const Classroom = require('../../models/classrooms')
const User = require('../../models/users')
const User_Classroom = require('../../models/users_classrooms')
const { generateClassroomCodeMethod } = require('../classroomCodeGenerator')


exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.findAll();
        res.statue(200).json(classrooms);
    } catch (error) {
        console.log("There is some error happened while retriving the whole classrooms", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.getClassroomById = async (req, res) => {
    try {
        const classroom = await Classroom.findByPk(req.params.id);
        if (!classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }
        res.status(200).json(classroom);
    } catch (error) {
        console.log("There is some error happened while retriving the classroom", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.deleteClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByPk(req.params.id)
        if (!classroom) 
        {
            return res.status(404).json({error: "Classroom not found, cannot delete"})
        }
        await classroom.destroy();
        res.status(200).json({message: "Classroom deleted successfully"});
    } catch (error) {
        console.log("There is some error happened while deleting the classroom", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.updateClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findByPk(req.params.id);
        if (!classroom) {
            return res.status(404).json({error: "Classroom not found"})
        }
        classroom.update(req.body, {
            validate: true, 
        });
        res.status(200).json(classroom);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({error: error.message, message: "Validation error"})
        }
        console.log("There is error occured while updating the classroom", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.createClassroom = async (req, res) => {
    try {
        const { classroom_name, teacher_id } = req.body;
        const description = req.body?.description || null;
        const user = await User.findByPk(teacher_id);
        if (!user){
            return res.status(404).json({error: "Teacher not found"})
        }
        else if (user.role !== 'teacher'){
            return res.status(401).json({error: "User is not authorized to create classroom"})
        }
        const classroom_code = await generateClassroomCodeMethod();
        const newClassroom = await Classroom.create({
            classroom_name,
            description,
            classroom_code,
            created_by: teacher_id
        });
        user.addClassroom(newClassroom);
        newClassroom.addUser(user);
        res.status(201).json(newClassroom);
    } catch (error) {
        console.log("There is some error happened while creating the classroom", error)
        res.status(500).json({error: "Internal server error"})
    }
}

// Classroom routes related to users interactions
exports.getClassroomUsingCreatedByAttribute = async (req, res) => {
    try {
        const classrooms = await Classroom.findAll({where: {created_by: req.body.teacher_id}});
        res.status(200).json(classrooms);
    } catch (error) {
        console.log("There is some error happened while retriving the classrooms", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.getClassroomAsscoiatedToUserId = async (req, res) => {
    try {
        const classrooms = await User_Classroom.findAll({where: {user_id: req.params.id}});
        res.status(200).json(classrooms);
    } catch (error) {
        console.log("There is some error happened while retriving the classrooms", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.getUsersAssociatedToClassroom = async (req, res) => {
    try {
        const users = await User_Classroom.findAll({where: {classroom_id: req.params.classroom_id}});
        res.status(200).json(users);
    } catch (error) {
        console.log("There is some error happened while retriving the users", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.removeUserFromClassroom = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const classroom = await Classroom.findByPk(req.params.classroom_id);
        if (!user){
            return res.status(404).json({error: "User not found"})
        }
        await user.removeClassroom(classroom);
        await classroom.removeUser(user);
        res.status(200).json({message: `${user.name} is removed from ${classroom.classroom_name} successfully`});
    } catch (error) {
        console.log("There is some error happened while removing the user from the classrooms", error)
        res.status(500).json({error: "Internal server error"})
    }
}

exports.joiningClassroom = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const classroom_code = req.body.classroom_code;
        const classroom = await Classroom.findOne({where: {classroom_code}});
        if (!user){
            return res.status(404).json({error: "User not found"})
        } else if (!classroom){
            return res.status(404).json({error: "Classroom not found"})
        }
        await user.addClassroom(classroom);
        await classroom.addUser(user);
        res.status(200).json({message: `${user.name} joined the ${classroom.classroom_name} successfully`});
    } catch (error) {
        console.log("There is some error happened while joining the user to the classroom", error)
        res.status(500).json({error: "Internal server error"})
    }
}