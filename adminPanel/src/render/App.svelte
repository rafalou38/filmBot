<script lang="ts">
    import "svelte-material-ui/bare.css";

    import CircularProgress from "@smui/circular-progress";

    import QuizEdit from "./lib/quizEdit.svelte";
    import QuizList from "./lib/quizList.svelte";
    import { currentQuiz } from "./lib/stores";
</script>

<!-- initDB was fulfilled -->
<div class="content">
    {#if $currentQuiz}
        <QuizEdit />
    {:else}
        <QuizList />
    {/if}
</div>

<style>
    .content {
        /* margin: 4em 2em; */
        width: 100%;
        /* max-width: 400px; */
        display: flex;
        flex-direction: column;
    }
</style>
