const express = require('express');
const { categorycreate, categoryget, postcategoryget } = require('../controllers/categoryController');
const router = express.Router();

router.post('/create', categorycreate);
router.get('/get', categoryget);
router.get('/get/:url', postcategoryget);


module.exports = router;