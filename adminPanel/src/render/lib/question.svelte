<script lang="ts">
    import type { IQuestion } from "../types/quiz";
    import Button, { Label, Icon } from "@smui/button";

    import Card, { Content } from "@smui/card";
    import Textfield from "@smui/textfield";
    import { createEventDispatcher } from "svelte";

    export let question: IQuestion;

    const dispatch = createEventDispatcher();
</script>

<div class="question">
    <Card variant="outlined" padded>
        <div class="content">
            <Textfield
                bind:value={question.question}
                class="q-edit"
                variant="filled"
                label="Question"
            />
            <Textfield
                bind:value={question.answer}
                class="q-edit"
                variant="filled"
                label="Réponse"
            />
            <Button variant="raised" class="red small-cent" on:click={() => dispatch("remove")}>
                <Icon class="material-icons">delete</Icon>
                <Label>supprimer</Label>
            </Button>
        </div>
    </Card>
</div>

<style>
    .content {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    :global(.mdc-button.small-cent) {
        width: max-content;
        margin-left: auto;
        margin-right: auto;
    }
    @media (min-width: 900px) {
        .content {
            flex-direction: row;
        }
        :global(.q-edit) {
            flex-grow: 1;
        }
    }
</style>
