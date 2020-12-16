const express = require('express');
const router = express.Router();
const userCtrl = require('../middlwares/userCtrl');

router.post('/signup', userCtrl.signup);

module.exports = router;