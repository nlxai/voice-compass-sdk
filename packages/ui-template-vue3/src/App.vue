<template>
  <CardTransition>
    <Card v-if="step === '1'" title="Welcome" key="1">
      <p>Welcome to</p>
      <Button @click="step = '2'">Begin Journey</Button>
    </Card>
    <Card v-if="step === '2'" title="Confirm Your Identity" key="2">
      <p>Two</p>
      <Button @click="step = '1'">Prev</Button>
    </Card>
  </CardTransition>
</template>

<script>
import CardTransition from "./components/CardTransition.vue";
import Card from "./components/Card.vue";
import Button from "./components/Button.vue";
import { create } from "@nlx-voice-compass/core";

// Extract contact ID from the 'cid' URL query parameter
const contactId = new URLSearchParams(window.location.search).get("cid");

// Create journey manager object
const compass = create({
  apiVersion: "v2",
  apiKey: "",
  botId: "-2228-4ac6-8c9c-f8a88247da1b",
  contactId,
  journeyId: "",
  debug: true, // turn on debug mode
});

export default {
  name: "App",
  components: {
    Button,
    Card,
    CardTransition,
  },
  mounted() {
    compass.updateStep({
      stepId: "abcd-1234",
    });
  },
  watch: {
    step(newStep) {
      if (newStep === "1") {
        compass.updateStep({
          stepId: "abcd-1234",
        });
      } else if (newStep === "2") {
        compass.updateStep({
          stepId: "efgh-5678",
        });
      }
    },
  },
  // Provide the compass client to subcomponents
  // See https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity
  provide: {
    compass,
  },
  data() {
    return {
      step: "1",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
