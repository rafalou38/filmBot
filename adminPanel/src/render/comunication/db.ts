import type { IQuiz } from "../types/quiz";

const { ipcRenderer } = require("electron");
// const { port1, port2 } = new MessageChannel();
export async function getQuizList() {
    const result = await ipcRenderer.invoke("getQuizList");
    console.log(result);

    return result as IQuiz[];
}
export async function getQuiz(id: string) {
    const result = await ipcRenderer.invoke("getQuiz", id);
    console.log(result);
    return result as IQuiz;
}
export async function addQuiz(): Promise<IQuiz> {
    const result = await ipcRenderer.invoke("addQuiz");
    console.log(result);
    return result as IQuiz;
}
export async function saveQuiz(quiz: IQuiz) {
    await ipcRenderer.invoke("saveQuiz", quiz);
}
