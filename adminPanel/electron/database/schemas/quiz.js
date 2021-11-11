"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
exports.Quiz = (0, mongoose_1.model)("quiz", schema);
