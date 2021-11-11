import { Document, model, Schema, Types } from "mongoose";

interface IQuestion extends Document {
    question: string;
    answer: string;
    quiz: Types.ObjectId;
}

const schema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: "quiz",
        required: true,
    },
});

export const Quiz = model<IQuestion>("question", schema);
export type Quiz = Document<unknown, unknown, IQuestion> &
    IQuestion & {
        _id: Types.ObjectId;
    };
