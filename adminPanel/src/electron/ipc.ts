import { ipcMain } from "electron";
import { addQuiz, getQuiz, getQuizList, removeQuiz, saveQuiz } from "./database/api/quiz";
import { Quiz } from "./database/schemas/quiz";

ipcMain.handle("getQuizList", async (event, ...args) => {
    const result = await getQuizList();
    return result.map((quiz) => {
        return quiz.toObject({ getters: true });
    });
});

ipcMain.handle("getQuiz", async (event, id) => {
    const result = await getQuiz(id);
    return result?.toObject({ getters: true });
});
ipcMain.handle("removeQuiz", async (event, id) => {
    const result = await removeQuiz(id);
    return !!result;
});
ipcMain.handle("addQuiz", async (event) => {
    const result = await addQuiz();
    return result.toObject({ getters: true });
});
ipcMain.handle("saveQuiz", async (event, quiz: Quiz) => {
    const result = await saveQuiz(quiz);
    return result;
});
