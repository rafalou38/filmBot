import mongoose from "mongoose";
import { log } from "utils/log";

export async function initDB() {
    return new Promise((resolve, reject) => {
        if (!process.env.MONGO_URI) return reject(new Error("Missing MONGO_URI in dotenv"));

        mongoose.connect(process.env.MONGO_URI, (err) => {
            if (err) {
                log("failed to connect to mongoDB ❌");
                reject(err);
            } else {
                log("successfully connected to mongoDB ✅");
                resolve(err);
            }
        });
    });
}
