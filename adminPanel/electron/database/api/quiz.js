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
exports.saveQuiz = exports.removeQuiz = exports.addQuiz = exports.getQuiz = exports.getQuizList = void 0;
const quiz_1 = require("../schemas/quiz");
function getQuizList() {
    return __awaiter(this, void 0, void 0, function* () {
        return quiz_1.Quiz.find({});
    });
}
exports.getQuizList = getQuizList;
function getQuiz(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return quiz_1.Quiz.findById(id);
    });
}
exports.getQuiz = getQuiz;
function addQuiz() {
    return __awaiter(this, void 0, void 0, function* () {
        const quiz = new quiz_1.Quiz();
        return quiz.save();
    });
}
exports.addQuiz = addQuiz;
function removeQuiz(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return quiz_1.Quiz.findByIdAndRemove(id);
    });
}
exports.removeQuiz = removeQuiz;
function saveQuiz(update) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(update.id);
        return quiz_1.Quiz.findByIdAndUpdate(update.id, {
            description: update.description,
            questions: update.questions,
            title: update.title,
        });
    });
}
exports.saveQuiz = saveQuiz;
