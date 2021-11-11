export type { IpcRenderer } from "electron";

export interface IQuiz extends Document {
    title: string;
    description: string;
    questions: {
        question: string;
        answer: string;
    }[];
}
