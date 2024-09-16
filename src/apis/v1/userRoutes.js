// making the user routing app
const express = require('express');
const router = express.Router();
const { createUser, deleteUser, getUserById, updateUser, getAllUsers } = require('../../utils/Controllers/userController');


router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/', getAllUsers);

module.exports = router;