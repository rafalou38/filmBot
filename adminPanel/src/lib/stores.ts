import { writable } from "svelte/store";
import type { Quiz } from "../database/schemas/quiz";

export const quizList = writable([]);
export const currentQuiz = writable<Quiz | null>(null);
