const express = require('express');
const { registerUser, userLogin, getUsers } = require('../controller/userController');

const router = express.Router();

router.get('/', getUsers); // This route gets all the registered users of the app(not a protected route)
router.post('/', registerUser); // This route is for users signup according to required feature (1)
router.post('/login', userLogin); // This route is for users signin according to required feature (2)

module.exports = router;