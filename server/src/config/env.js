import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/namah_siddham',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_namah_siddham_2026_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie_secret_namah_siddham_key_secure',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  INITIAL_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL || 'admin@namahsiddham.com',
  INITIAL_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD || 'AdminSecure2026#Namah',
  INITIAL_ADMIN_NAME: process.env.INITIAL_ADMIN_NAME || 'Chief Administrator',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB || '5', 10),
};
