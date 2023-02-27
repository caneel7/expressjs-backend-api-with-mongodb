const express = require('express');
const router = express.Router();
const usersController = require('../../controller/usersController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(verifyRoles(rolesList.Admin),usersController.getAllUser)
    .delete(verifyRoles(rolesList.Admin),usersController.deleteUser)

router.route('/:id')
    .get(verifyRoles(rolesList.Admin),usersController.getUser)

module.exports = router;