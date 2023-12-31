import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import {v4} from 'uuid';
import cors from 'cors';
import * as basicAuth from 'express-basic-auth';
import AdmZip from 'adm-zip';
import bodyParser from 'body-parser';

import {config} from './config';

const {port, user, password} = config;

const buildPath = path.join(__dirname, '../public');

const storage = multer.diskStorage({
    destination: 'public',
    filename: function (req, file, cb) {
        const fileName = v4() + path.extname(file.originalname);

        cb(null, fileName);
    }
});

const upload = multer({storage});

const expressApp = express();

expressApp.use(bodyParser.json());
expressApp.use(cors());

const authMiddleware = basicAuth.default({users: {[user]: password}});

expressApp.use('/', express.static(buildPath));

expressApp.get('/export', authMiddleware, (req, res) => {
    fs.readdir(buildPath, (err, files) => {
        const zip = new AdmZip();

        for (const file of files) {
            zip.addLocalFile(path.join(buildPath, file));
        }

        res.writeHead(200, {
            'Content-Disposition': 'attachment; filename="content.zip"',
            'Content-Type': 'application/zip',
        });

        res.end(zip.toBuffer());

        console.log(`export ${files.length} files`);
    });
});

expressApp.post('/import', authMiddleware, (req, res) => {
    multer({storage: multer.memoryStorage()}).single('file')(req, null, () => {
        if (req.file) {
            const files = new AdmZip(req.file.buffer).getEntries();

            let importedFiles = 0;

            for (const file of files) {
                const filePath = path.join(buildPath, file.name);
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, file.getData());

                    importedFiles++;
                }
            }

            console.log(`import ${importedFiles} files`);

            return res.sendStatus(200);
        }
        
        return res.sendStatus(403);
    });
});

expressApp.post('/', authMiddleware, upload.array('data'), (req, res) => {
    const files = req.files as Express.Multer.File[];

    if (files) {
        const result = files.map(f => f.filename);

        console.log('upload complete', result);

        return res.json(result);
    }

    console.log('upload failed');

    return res.sendStatus(403);
});

expressApp.listen(port, () => {
    console.log('Server running', config);
});
