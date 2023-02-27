const express = require('express');
const router = express.Router();
const employeesController = require('../../controller/employeesController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(rolesList.Admin,rolesList.Editor),employeesController.createNewEmployee)
    .put(verifyRoles(rolesList.Admin,rolesList.Editor),employeesController.updateEmployee)
    .delete(verifyRoles(rolesList.Admin),employeesController.deleteEmployee)

router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router;