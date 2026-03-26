import databaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
    platform: string;
    created_at: string;
};

class UserRepository {
    async create(user: Omit<User, "id" | "created_at">) {
        const [result] = await databaseClient.query<Result>(
            "INSERT INTO user (username, email, password, platform) VALUES (?, ?, ?, ?)",
            [user.username, user.email, user.password, user.platform]
        );
        return result.insertId;
    }

    async findByEmail(email: string) {
        const [rows] = await databaseClient.query<Rows>(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );
        return rows[0] as User | undefined;
    }

    async findById(id: number) {
        const [rows] = await databaseClient.query<Rows>(
            "SELECT id, username, email, bio, platform, created_at FROM user WHERE id = ?",
            [id]
        );
        return rows[0] as User | undefined;
    }
}

export default new UserRepository();
