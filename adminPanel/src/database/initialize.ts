import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export async function initDB() {
    return new Promise((resolve, reject) => {
        if (MONGO_URI) return reject(new Error("Missing MONGO_URI in dotenv"));

        mongoose.connect(MONGO_URI, (err) => {
            if (err) {
                console.log("failed to connect to mongoDB ❌");
                reject(err);
            } else {
                console.log("successfully connected to mongoDB ✅");
                resolve(err);
            }
        });
    });
}
