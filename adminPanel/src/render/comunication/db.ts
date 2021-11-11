import type { IQuiz } from "../types/quiz";

const { ipcRenderer } = require("electron");
// const { port1, port2 } = new MessageChannel();
export async function getQuizList(): Promise<IQuiz[]> {
    const result = await ipcRenderer.invoke("getQuizList");
    return result;
}
export async function getQuiz(id: string): Promise<IQuiz> {
    const result = await ipcRenderer.invoke("getQuiz", id);
    return result;
}
export async function addQuiz(): Promise<IQuiz> {
    const result = await ipcRenderer.invoke("addQuiz");
    return result;
}
export async function removeQuiz(id: string): Promise<boolean> {
    const result = await ipcRenderer.invoke("removeQuiz", id);
    return result;
}
export async function saveQuiz(quiz: IQuiz): Promise<boolean> {
    return await ipcRenderer.invoke("saveQuiz", quiz);
}
