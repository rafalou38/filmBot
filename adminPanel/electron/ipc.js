"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const quiz_1 = require("./database/api/quiz");
electron_1.ipcMain.handle("getQuizList", (event, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quiz_1.getQuizList)();
    return result.map((quiz) => {
        return quiz.toObject({ getters: true });
    });
}));
electron_1.ipcMain.handle("getQuiz", (event, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quiz_1.getQuiz)(id);
    return result === null || result === void 0 ? void 0 : result.toObject({ getters: true });
}));
electron_1.ipcMain.handle("removeQuiz", (event, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quiz_1.removeQuiz)(id);
    return !!result;
}));
electron_1.ipcMain.handle("addQuiz", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quiz_1.addQuiz)();
    return result.toObject({ getters: true });
}));
electron_1.ipcMain.handle("saveQuiz", (event, quiz) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, quiz_1.saveQuiz)(quiz);
    return result;
}));
