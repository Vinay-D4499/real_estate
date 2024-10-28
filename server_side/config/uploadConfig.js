// uploadConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/profile_pictures/';
        
        // Check if the directory exists; if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir); // Define where files are saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${req.user}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });
module.exports = upload;
