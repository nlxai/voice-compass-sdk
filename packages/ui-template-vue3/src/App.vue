<template>
  <CardTransition>
    <Card v-if="step === '1'" title="Welcome" key="1">
      <div class="space-y-4">
        <p>We have found your email based on your phone number:</p>
        <Input :value="email" @change="handleEmailInput" />
        <p>Is this correct?</p>
      </div>
      <div class="space-y-4">
        <Button @click="step = '2'">Yes</Button>
        <SimpleButton @click="contactSupport">Contact Support</SimpleButton>
      </div>
    </Card>
    <Card v-if="step === '2'" title="How can we help you today?" key="2">
      <p>Please choose from the issues below:</p>
      <Checklist
        :options="checklistOptions"
        :value="checklistSelected"
        @change="handleChecklist"
      />
      <Button @click="step = '3'">Continue</Button>
    </Card>
    <Card v-if="step === '3'" title="Let's begin" key="3">
      <p>TBD</p>
      <Button @click="step = '2'">Previous Step</Button>
    </Card>
  </CardTransition>
</template>

<script>
import CardTransition from "./components/CardTransition.vue";
import Card from "./components/Card.vue";
import Checklist from "./components/Checklist.vue";
import Button from "./components/Button.vue";
import SimpleButton from "./components/SimpleButton.vue";
import Input from "./components/Input.vue";
import { create } from "@nlx-voice-compass/core";

// Extract contact ID from the 'cid' URL query parameter
const contactId = new URLSearchParams(window.location.search).get("cid");

// Create journey manager object
const compass = create({
  contactId,
  apiVersion: "v2",
  apiKey: "",
  botId: "",
  journeyId: "",
  debug: true, // turn on debug mode
});

export default {
  name: "App",
  components: {
    Button,
    SimpleButton,
    Input,
    Card,
    CardTransition,
    Checklist,
  },
  mounted() {
    compass.updateStep({
      stepId: "abcd-1234",
    });
  },
  data() {
    return {
      step: "1",
      email: "user@email.com",
      checklistSelected: [],
      checklistOptions: [
        { value: "option-1", label: "Option 1" },
        { value: "option-2", label: "Option 2" },
        { value: "option-3", label: "Option 3" },
        { value: "option-4", label: "Option 4" },
      ],
    };
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
  methods: {
    contactSupport() {
      compass.updateStep({
        stepId: "abcd",
      });
    },
    handleEmailInput(newEmail) {
      this.email = newEmail;
    },
    handleChecklist(newChecklist) {
      this.checklistSelected = newChecklist;
    },
  },
};
</script>
