const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/user");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post('/createuser', upload.single('image'), userController.createuser);
router.get('/getuser', userController.userget);

module.exports = router;