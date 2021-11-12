<script lang="ts">
    import Button, { Label, Icon } from "@smui/button";
    import List, { Item, Separator, Text } from "@smui/list";
    import { addQuiz, saveQuiz } from "../comunication/db";

    import { currentQuiz, quizList } from "./stores";

    async function buttonClicked() {
        let result = await addQuiz();
        if (result) {
            $quizList.push(result);
            currentQuiz.set(result);
            $quizList = $quizList;
        }
        console.log(result);
    }
    async function save() {
        let result = await Promise.all($quizList.map(saveQuiz));
        if (result.find((x) => x === false)) {
            alert("Error saving all quiz");
        } else {
            alert("All quiz saved");
        }
        console.log(result);
    }
</script>

{#if $quizList.length > 0}
    <List class="demo-list">
        {#each $quizList as quiz}
            <Item on:SMUI:action={() => currentQuiz.set(quiz)}><Text>{quiz.title}</Text></Item>
        {/each}
    </List>
{/if}
<Button variant="raised" on:click={buttonClicked}>
    <Icon class="material-icons">add</Icon>
    <Label>New quiz</Label>
</Button>
<div class="grow" />
<Button variant="raised" on:click={save}>
    <Icon class="material-icons">save</Icon>
    <Label>Save All</Label>
</Button>

<style>
    :global(.demo-list) {
        border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    }
</style>
