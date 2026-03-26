import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const migrate = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
    });

    try {
        const sql = fs.readFileSync(
            path.join(__dirname, "schema.sql"),
            "utf8"
        );

        await connection.query(sql);
        console.log("Database migrated successfully 🆙");
        process.exit(0);
    } catch (err) {
        console.error("Migration error:", err);
        process.exit(1);
    } finally {
        await connection.end();
    }
};

migrate();
