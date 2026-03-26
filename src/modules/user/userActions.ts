import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository";

const register: RequestHandler = async (req, res, next) => {
    try {
        const { username, email, password, platform } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const id = await userRepository.create({
            username,
            email,
            password: hashed,
            bio: "",
            platform: platform || "manual",
        });
        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
};

const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
            return;
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ message: "Email ou mot de passe incorrect" });
            return;
        }
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.APP_SECRET as string,
            { expiresIn: "7d" }
        );
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        next(err);
    }
};

export default { register, login };
