import dotenv from 'dotenv';

dotenv.config();

export const config = {
    password: process.env.PASSWORD || 'password',
    contentDirName: process.env.CONTENT_DIR_NAME || 'public',
    port: Number(process.env.PORT) || 11111,
};

