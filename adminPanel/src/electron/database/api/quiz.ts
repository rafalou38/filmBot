import { Quiz } from "../schemas/quiz";

export async function getQuizList() {
    return Quiz.find({});
}
export async function getQuiz(id: string) {
    return Quiz.findById(id);
}
export async function addQuiz() {
    const quiz = new Quiz();
    return quiz.save();
}
export async function removeQuiz(id: string) {
    return Quiz.findByIdAndRemove(id);
}
export async function saveQuiz(update: Quiz) {
    return Quiz.findByIdAndUpdate(update.id, {
        description: update.description,
        questions: update.questions.map((q) => ({
            answer: q.answer,
            question: q.question,
        })),
        title: update.title,
    });
}
