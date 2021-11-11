import { Quiz } from "../schemas/quiz";

export async function getQuizList() {
    return Quiz.find({}, "title");
}
