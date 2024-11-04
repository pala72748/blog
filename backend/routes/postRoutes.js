const { postcreate, postget, postuserget, postlike } = require('../controllers/postController');

const router = require('express').Router();



router.post('/create', postcreate);
router.post('/like', postlike);
router.get('/get', postget);
router.get('/get/:username', postuserget);


module.exports = router;