const multer = require('multer');
const path = require('path');

const uploaduser = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/user')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const userupload = multer({ storage: uploaduser });

module.exports = userupload;