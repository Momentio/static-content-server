import dotenv from 'dotenv';

dotenv.config();

export const config = {
    user: process.env.CONTENT_SERVER_USER || 'client',
    password: process.env.CONTENT_SERVER_PASSWORD || 'password',
    port: Number(process.env.CONTENT_SERVER_PORT) || 3000,
};
