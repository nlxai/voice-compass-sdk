<script context="module" lang="ts">
  export async function preload(page) {
    return { query: page.query };
  }
</script>

<script lang="ts">
  import { tw } from "twind";
  import Cards from "../components/Cards.svelte";
  import Card from "../components/Card.svelte";
  import Button from "../components/Button.svelte";
  import { noRequest, pending } from "../utils";
  import SimpleButton from "../components/SimpleButton.svelte";
  import Checklist from "../components/Checklist.svelte";
  import Rate from "../components/Rate.svelte";
  import Loader from "../components/Loader.svelte";
  import { onMount, onDestroy } from "svelte";
  import { create } from "@nlx-voice-compass/core";

  const journeyId = "MyJourney";

  let compass = undefined;
  let screen: string = "01";

  export let query: Record<string, any> = {};

  const checklist = [
    { value: "item-1", label: "Item 1" },
    { value: "item-2", label: "Item 2" },
    { value: "item-3", label: "Item 3" },
  ];
  let checklistSelected: Array<string> = [];

  let rating = undefined;

  const stepsByScreen: Record<
    string,
    string | { stepId: string; escalate?: boolean; end?: boolean }
  > = {
    "01": "1234",
    "02": "5678",
  };

  const trackStep = (stepId: string) => {
    if (!compass) {
      return;
    }
    const step = stepsByScreen[stepId];
    const stepPayload =
      typeof step === "string"
        ? {
            stepId: step,
            payload: {},
            journeyId,
          }
        : typeof step === "object"
        ? {
            ...step,
            payload: {},
            journeyId,
          }
        : null;
    if (stepPayload) {
      compass.updateStep(stepPayload);
    }
  };

  $: trackStep(screen);

  $: progress = {
    "01": undefined,
    "02": 0.2,
    "03": 0.5,
  }[screen];

  onMount(() => {
    compass = create({
      apiKey: "",
      botId: "",
      journeyId: "MyJourney",
      contactId: query.cid,
    });

    trackStep(screen);
  });

  let ratingRequestStatus = noRequest;

  const submitRating = () => {
    ratingRequestStatus = pending;
    setTimeout(() => {
      ratingRequestStatus = noRequest;
      screen = "03";
    }, 2000);
  };
</script>

<svelte:head>
  <title>Voice Compass Template</title>
</svelte:head>

{#if query.cid}
  <Cards {progress}>
    {#if screen === '01'}
      <Card title="Let's get started">
        <p>Make sure you have the following:</p>
        <Checklist
          value={checklistSelected}
          options={checklist}
          on:change={(ev) => {
            checklistSelected = ev.detail;
          }} />
        <div>
          <Button
            disabled={checklist.length !== checklistSelected.length}
            on:click={() => {
              screen = '02';
            }}>
            Continue
          </Button>
        </div>
      </Card>
    {:else if screen === '02'}
      <Card title="Success!">
        <Rate bind:value={rating} />
        <div>
          <Button
            disabled={!rating}
            on:click={submitRating}
            status={ratingRequestStatus}>
            Submit rating
          </Button>
          <SimpleButton
            on:click={() => {
              screen = '01';
            }}>
            Back
          </SimpleButton>
        </div>
      </Card>
    {:else if screen === '03'}
      <Card title="Success!">
        <p>You can close the page.</p>
      </Card>
    {/if}
  </Cards>
{:else}
  <p>No customer ID provided.</p>
{/if}
