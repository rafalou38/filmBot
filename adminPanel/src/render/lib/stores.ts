import { writable } from "svelte/store";
import { getQuizList } from "../comunication/db";
import type { IQuiz } from "../types/quiz";

export const quizList = writable<IQuiz[]>([]);
export const currentQuiz = writable<IQuiz | null>(null);

getQuizList().then(quizList.set);
