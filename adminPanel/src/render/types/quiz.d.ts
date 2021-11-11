export type { IpcRenderer } from "electron";

export interface IQuiz {
    id: string;
    title: string;
    description: string;
    questions: IQuestion[];
}
export interface IQuestion {
    question: string;
    answer: string;
}
