import { Document, model, Schema, Types } from "mongoose";

interface IQuiz extends Document {
    title: string;
    description: string;
    questions: Types.ObjectId[];
}

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question",
        },
    ],
});

export const Quiz = model<IQuiz>("quiz", schema);
export type Quiz = Document<unknown, unknown, IQuiz> &
    IQuiz & {
        _id: Types.ObjectId;
    };
