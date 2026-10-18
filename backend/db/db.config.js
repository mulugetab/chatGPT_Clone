import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 4000,

  // Secure connection for TiDB Cloud
  ssl: {
    minVersion: "TLSv1.2",
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
try {
  const connection = await db.getConnection();

  console.log("Database connected successfully!");

  connection.release();
} catch (error) {
  console.error(
    "Database connection failed:",
    error.message
  );
}

export default db;
