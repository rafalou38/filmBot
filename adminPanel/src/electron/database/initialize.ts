import { connect } from "mongoose";

async function initDB() {
    console.log(connect);

    return new Promise((resolve, reject) => {
        if (!process.env.MONGO_URI) return reject(new Error("Missing MONGO_URI in dotenv"));

        connect(process.env.MONGO_URI, (err) => {
            console.log(err);

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

export const dbLoad = initDB();
