<script lang="ts">
    import "svelte-material-ui/bare.css";

    import CircularProgress from "@smui/circular-progress";

    import QuizEdit from "./lib/quizEdit.svelte";
    import QuizList from "./lib/quizList.svelte";
    import { currentQuiz } from "./lib/stores";
</script>

<!-- initDB was fulfilled -->
{#if $currentQuiz}
    <QuizEdit />
{:else}
    <QuizList />
{/if}
