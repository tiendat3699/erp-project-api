const File = require('../models/File.model');
const path = require('path');

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
        const upFile = upload.single(key);
        upFile(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: 'failed to upload file' });
            }

            if (req.file) {
                const file = new File({
                    name: req.file.filename,
                    contentType: req.file.mimetype,
                    path: req.file.path,
                });
                file.save().then((file) => {
                    req.body[key] = file._id;
                    req.body[key + '_url'] = process.env.BASE_URL_BE + '/public/uploads/' + file.name;
                    return next();
                });
            } else {
                return next();
            }
        });
    };
};

const useDefaultImage = (req, res, next) => {
    if (!req.body.avatar) {
        const defaultImageId = '643e639fab501a0e88bc1230';
        File.findById(defaultImageId)
            .then((file) => {
                req.body.avatar = file._id;
                req.body.avatar_url = process.env.BASE_URL_BE + '/public/uploads/' + file.name;
                return next();
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return next();
    }
};

module.exports = { uploadFile, useDefaultImage };
