const File = require('../models/File.model');
const path = require('path');
const url = require('url');

//config multer
const multer = require('multer');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
                '-' +
                path.parse(file.originalname).name +
                '-' +
                Date.now() +
                path.extname(file.originalname),
        );
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 3000000 } });

const uploadFile = (key) => {
    return (req, res, next) => {
        const uploadFile = upload.single(key);
        uploadFile(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: 'failed to upload file' });
            }

            if (req.file == null) {
                return res.json({ message: 'file is required' });
            } else {
                const file = new File({
                    name: req.file.filename,
                    contentType: req.file.mimetype,
                    path: req.file.path,
                });
                file.save().then((file) => {
                    req.body[key] = file._id;
                    req.body.fileUrl = process.env.BASE_URL_BE + '/public/uploads/' + file.name;
                    return next();
                });
            }
        });
    };
};

module.exports = uploadFile;
