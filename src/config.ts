import dotenv from 'dotenv';

dotenv.config();

export const config = {
    contentDirName: process.env.CONTENT_DIR_NAME || 'public',
    port: Number(process.env.PORT) || 11111,
};

