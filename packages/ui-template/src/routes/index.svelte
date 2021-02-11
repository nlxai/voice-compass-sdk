<script context="module" lang="ts">
  export async function preload(page) {
    return { query: page.query };
  }
</script>

<script lang="ts">
  import { tw } from "twind";
  import Cards from "../components/Cards.svelte";
  import Card from "../components/Card.svelte";
  import CapturePhoto from "../components/CapturePhoto.svelte";
  import Button from "../components/Button.svelte";
  import SimpleButton from "../components/SimpleButton.svelte";
  import { pending } from "../components/Button";
  import Checklist from "../components/Checklist.svelte";
  import Rate from "../components/Rate.svelte";
  import Input from "../components/Input.svelte";
  import Loader from "../components/Loader.svelte";
  import { Kind } from "../components/Input";
  import { onMount, onDestroy } from "svelte";
  import { create } from "@nlx-voice-compass/core";

  let compass = undefined;
  let screen: string = "01";

  export let query: Record<string, any> = {};

  const stepsByScreen: Record<
    string,
    string | { stepId: string; escalate?: boolean; end?: boolean }
  > = {
    "01": "1234",
    "02": "5678",
  };

  const journeyId = "MyJourney";

  onMount(() => {
    compass = create({
      apiKey: "",
      botId: "",
      journeyId: "MyJourney",
      contactId: query.cid,
    });

    try {
      compass.trackDomAnnotations();
    } catch (err) {}
  });

  onDestroy(() => {
    try {
      compass.stopTrackingDomAnnotations();
    } catch (err) {}
  });

  $: trackStep = (stepId: string) => {
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

  let rating = undefined;

  let code = "";

  $: progress = screen === "01" ? undefined : 0.2;

  $: trackStep(screen);

  let testChecked: Array<string> = [];
</script>

<svelte:head>
  <title>Voice Compass Template</title>
</svelte:head>

{#if query.cid}
  <Cards {progress}>
    {#if screen === '01'}
      <Card title="Screen 1">
        <Loader />
        <button
          class={tw`bg-brand hover:bg-brandLighter text-white px-2 py-1 rounded`}
          vc-click-step="1234-abcd"
          vc-click-escalate>Click me</button>
        {#if false}
          <CapturePhoto />
        {/if}
        <p>Screen 1 content.</p>
        <Rate bind:value={rating} />
        <Input
          bind:value={code}
          placeholder="Placeholder"
          label="Input"
          kind={Kind.Number} />
        <Checklist
          value={testChecked}
          options={[{ value: 'a', label: 'A' }]}
          on:change={(ev) => {
            testChecked = ev.detail;
          }} />
        <div>
          <Button
            status={undefined && pending}
            on:click={() => {
              screen = '02';
            }}>
            Next
          </Button>
        </div>
      </Card>
    {:else if screen === '02'}
      <Card title="Screen 2">
        <p>Screen 2 content.</p>
        <div>
          <SimpleButton
            on:click={() => {
              screen = '01';
            }}>
            Back
          </SimpleButton>
        </div>
      </Card>
    {/if}
  </Cards>
{:else}
  <p>No customer ID provided.</p>
{/if}
