import { Document, model, Schema, Types } from "mongoose";

interface IDBMember {
    userID: string;
    username: string;
}

const schema = new Schema<IDBMember>({
    userID: { type: String, required: true },
    username: { type: String, required: false },
});

export const DBMember = model<IDBMember>("member", schema);
export type DBMember = Document<unknown, unknown, IDBMember> &
    IDBMember & {
        _id: Types.ObjectId;
    };
