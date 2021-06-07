const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users.js');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');

const { validateLogIn, validateSignUp } = require('./validation');

router.post('/signup', validateSignUp, ctrl.signup);
router.post('/login', validateLogIn, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.сurrent);
router.patch('/avatars', [guard, upload.single('avatar')], ctrl.avatars);

module.exports = router;
