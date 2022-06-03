<script lang="ts">
  import { derived } from "svelte/store";
  import Cards from "../components/Cards.svelte";
  import Card from "../components/Card.svelte";
  import Button from "../components/Button.svelte";
  import { noRequest, pending } from "../utils";
  import SimpleButton from "../components/SimpleButton.svelte";
  import Checklist from "../components/Checklist.svelte";
  import Rate from "../components/Rate.svelte";
  import { vc } from "../store";
  import { create } from "@nlx-voice-compass/core/src";

  const vcClient = derived(vc, ($vc) =>
    $vc.mounted
      ? create({
          botId: $vc.botId,
          apiKey: $vc.apiKey,
          contactId: $vc.contactId || "",
          journeyId: "MyJourney",
        })
      : undefined
  );

  let buttonWrap;
  let compass = undefined;

  const createEscalationButton = wrap => {
    if (!wrap)
      return;

    $vcClient.appendEscalationButton({
      wrap,
      text: "Click me!"
    });
  };

  $: createEscalationButton(buttonWrap);

  type Screen = "01" | "02" | "03" | "04";

  let screen: Screen = "01";

  const checklist = [
    { value: "item-1", label: "Item 1" },
    { value: "item-2", label: "Item 2" },
    { value: "item-3", label: "Item 3" },
  ];
  let checklistSelected: Array<string> = [];

  let rating = undefined;

  type StepsByScreen = Record<
    Screen,
    string | { stepId: string; escalate?: boolean; end?: boolean }
  >;

  const stepsByScreen: StepsByScreen = {
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
          }
        : typeof step === "object"
        ? {
            ...step,
            payload: {},
          }
        : null;
    if (stepPayload) {
      compass.updateStep(stepPayload);
    }
  };

  $: {
    const step: StepsByScreen[keyof StepsByScreen] = stepsByScreen[screen];
    step &&
      $vcClient?.updateStep(
        typeof step === "string"
          ? {
              stepId: step,
              payload: {},
            }
          : {
              ...step,
              payload: {},
            }
      );
  }

  $: trackStep(screen);

  $: progress = {
    "01": undefined,
    "02": 0.2,
    "03": 0.5,
  }[screen];

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

{#if $vc.contactId}
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
  <div bind:this={buttonWrap}></div>
{:else}
  <p>No customer ID provided.</p>
{/if}
