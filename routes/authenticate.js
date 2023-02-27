const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authenticationController');

router.post('/',authenticationController.loginHandler)

module.exports = router;