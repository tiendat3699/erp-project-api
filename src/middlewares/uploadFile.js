const File = require('../models/File.model');
var fs = require('fs');

//config multer
const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

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
                const newFile = fs.readFileSync(req.file.path);
                const encFile = newFile.toString('base64');
                const file = new File({
                    name: req.file.filename,
                    file: {
                        contentType: req.file.mimetype,
                        data: Buffer(encFile, 'base64'),
                    },
                });

                file.save().then((file) => {
                    req.body[key] = file._id;
                    return next();
                });
            }
        });
    };
};

module.exports = uploadFile;
