import { Document, model, Schema, Types } from "mongoose";

interface IQuiz extends Document {
    title: string;
    description: string;
    questions: {
        question: string;
        answer: string;
    }[];
}

const schema = new Schema({
    title: {
        type: String,
        default: "new quiz",
    },
    description: {
        type: String,
        default: "quiz",
    },
    questions: [
        {
            question: {
                type: String,
                default: "new question",
            },
            answer: {
                type: String,
                default: "answer",
            },
        },
    ],
});

export const Quiz = model<IQuiz>("quiz", schema);
export type Quiz = Document<unknown, unknown, IQuiz> &
    IQuiz & {
        _id: Types.ObjectId;
    };
