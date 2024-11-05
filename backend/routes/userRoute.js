const express = require('express');
const { register, login, logout, getallusers } = require('../controllers/userController');
const userupload = require('../middleware/Uploads');
const router = express.Router();


router.post('/register', userupload.single('image'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/get', getallusers)

module.exports = router;