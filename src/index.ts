import path from 'path';
import express from 'express';
import multer from 'multer';
import {v4} from 'uuid';

import {config} from './Config';

const {port, contentDirName} = config;

const buildPath = path.join(__dirname, `../${contentDirName}`);

const storage = multer.diskStorage({
    destination: contentDirName,
    filename: function (req, file, cb) {
        const fileName = v4() + path.extname(file.originalname);

        cb(null, fileName);
    }
});

const upload = multer({storage});

const expressApp = express();

expressApp.use('/', express.static(buildPath));

expressApp.post('/', upload.array('data'), (req, res) => {
    const files = req.files as Express.Multer.File[];

    if (files) {
        const url = req.protocol + '://' + req.get('host');
        const result = files.map(f => `${url}/${f.filename}`);

        return res.json(result);
    }

    return res.sendStatus(403);
});

expressApp.listen(port);
