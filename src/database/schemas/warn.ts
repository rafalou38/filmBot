import { Document, model, Schema, Types } from "mongoose";

interface IDBWarn {
    userID: string;
    username: string;
    authorUserID: string;
    authorUsername: string;
    reason: string;
    date: Date;
}

const schema = new Schema({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    authorUserID: { type: String, required: true },
    authorUsername: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: Date, required: true },
});

export const DBWarn = model<IDBWarn>("warn", schema);
export type DBWarn = Document<unknown, unknown, IDBWarn> &
    IDBWarn & {
        _id: Types.ObjectId;
    };
