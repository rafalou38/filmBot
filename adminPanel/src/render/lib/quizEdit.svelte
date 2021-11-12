<script lang="ts">
    import Textfield from "@smui/textfield";
    import Button, { Label, Icon } from "@smui/button";

    import { currentQuiz, quizList } from "./stores";
    import Question from "./question.svelte";
    import { getQuizList, removeQuiz, saveQuiz } from "../comunication/db";

    async function save() {
        let result = await saveQuiz($currentQuiz);
        if (result) {
            alert("Quiz saved");
            $currentQuiz = null;
        } else {
            alert("Error saving quiz");
        }
    }
    function back() {
        currentQuiz.set(null);
    }
    function addQuestion() {
        $currentQuiz.questions.push({
            question: "",
            answer: "",
        });
        $currentQuiz = $currentQuiz;
    }
    function removeQuestion(index: number) {
        $currentQuiz.questions.splice(index, 1);
        $currentQuiz = $currentQuiz;
    }
    async function deleteQuiz() {
        await removeQuiz($currentQuiz.id);
        getQuizList().then(quizList.set);
        currentQuiz.set(null);
    }
</script>

<Button variant="raised" color="secondary" on:click={back}>
    <Icon class="material-icons">arrow_back</Icon>
    <Label>retour</Label>
</Button>

<div class="edit">
    <div class="section">
        <div class="mdc-typography--headline4">Infos sur le quiz</div>
        <Textfield bind:value={$currentQuiz.title} variant="filled" label="Nom" />
        <Textfield
            textarea
            bind:value={$currentQuiz.description}
            variant="filled"
            label="Description"
        />
    </div>
    <div class="section">
        <div class="mdc-typography--headline4">Questions</div>
        {#each $currentQuiz.questions as question, i}
            <Question {question} on:remove={removeQuestion.bind(null, i)} />
        {/each}
        <Button variant="raised" on:click={addQuestion}>
            <Icon class="material-icons">add</Icon>
            <Label>Ajouter</Label>
        </Button>
    </div>
</div>
<Button variant="raised" class="red" on:click={deleteQuiz}>
    <Icon class="material-icons">delete</Icon>
    <Label>supprimer</Label>
</Button>
<div class="grow" />
<Button variant="raised" class="btn-save" on:click={save}>
    <Icon class="material-icons">save</Icon>
    <Label>save</Label>
</Button>

<style>
    :global(.mdc-button.red) {
        margin-top: 0.75em;
        background-color: red !important;
    }
    :global(.grow) {
        flex-grow: 1;
        min-height: 4em;
    }

    .section {
        gap: 1em;
        display: flex;
        flex-direction: column;
    }
    .edit {
        gap: 1em;
        display: flex;
        flex-direction: column;
        margin: 1em;
    }
</style>
