<script lang="ts">
    import QuizEdit from "./lib/quizEdit.svelte";
    import QuizList from "./lib/quizList.svelte";
    import { currentQuiz } from "./lib/stores";
</script>

{#if $currentQuiz}
    <QuizEdit />
{:else}
    <QuizList />
{/if}
