/**
 * @description This file contains the user controller that will manage all the CRUD operations for the user model
 * @module UserControllers
 * @function createUser - Create a new user
 * @function deleteUser - Delete a user
 * @function getUserById - Get a user by id
 * @function updateUser - Update a user
 * @function getAllUsers - Get all users
 * @function validateUserLoggingIn - Validate user logging in
 * @exports createUser, deleteUser, getUserById, updateUser, getAllUsers, validateUserLogging
 */

const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const { genSalt } = require('bcrypt');

const generateSalt = async () => {
    return await bcrypt.genSalt(10);
  };

// making a console that will manage to make all the CRUD operations
exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        console.log(firstname, lastname, email, password, role)
        const salt = await generateSalt();
        const passwrd_hashed = await bcrypt.hash(password, salt);
        const user = User.findAll({
            where: {
                email: email,
            }
        })
        if (user){
            req.status(409).json({error: "User already exists, try logging in"})
        }
        const newuser = await User.create({
            firstname: firstname,
            password: passwrd_hashed,
            lastname: lastname,
            role: role,
            email: email,
        });

        res.status(201).json(newuser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.validateUserLoggingIn = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = User.findOne({where: {
        email: email,
        }})
        bcrypt.compare(password, user.password, (err, result) => {
            if (err){
                console.log("Error Happend")
            }

            if (result){
                console.log("Password Matches the Target")
            }
            else
            {
                res.status(401).json({message: "User Authentication failed"})
            }
        })
    } catch{
        res.status(500).json({message: "Error Happened while logging in"})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({error: "User not found"});
        
        await user.destroy();
        res.status(200).json({message: "User deleted successfully"});
    } catch (error){
        console.log("There is some error happened", error)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user)
    } catch (error){
        console.log("some error happened while finding the user wanted", error)
    }
}
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.update(req.body);
        return res.status(200).json(user); // Ensure you send a response back
    } catch (error) {
        console.error("There was an error during the user update:", error);
        return res.status(500).json({ error: "Failed to update the user" });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        console.log("getting all users")
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error){
        console.log("there is some error happened", error)
    }
}