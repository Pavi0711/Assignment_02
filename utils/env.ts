import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  adminURL: process.env.ADMIN_URL || 'http://localhost:3000/admin',
  fileUploadPath: process.env.FILE_UPLOAD_PATH || './tests/resources/images/sample_image1.png',
    updatedFileUploadPath: process.env.UPDATED_FILE_UPLOAD_PATH || './tests/resources/images/sample_image2.png',
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSLMODE === "disable" ? false : true,
  }
};