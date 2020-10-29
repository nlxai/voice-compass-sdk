import type { Step } from "./logic";
import { isValidEmail } from "./utils";

const journeyId = "abcd";

export const logic: Record<string, Step> = {
  root: {
    title: "Support",
    body: "What can I assist you with?",
    $enter: {
      stepId: "83803968-85bf-45ed-8301-4c8b8057da6d",
      journeyId,
    },
    input: {
      type: "choice",
      set: "topic",
      choices: [
        {
          label: "Buttons",
          value: "buttons",
          next: "location-name",
          $select: {
            stepId: "cb023f0f-cbf8-4ec4-a884-753ffd616fba",
            journeyId,
          },
        },
        {
          label: "User Request",
          value: "user-request",
          next: "location-name",
          $select: {
            stepId: "319927bd-92ce-425e-8aaa-168bec2e334e",
            journeyId,
          },
        },
        {
          label: "Inspection Changes",
          value: "inspection-changes",
          next: "location-name",
          $select: {
            stepId: "ee7c5349-8b72-4d49-8765-dd633c51e14c",
            journeyId,
          },
        },
        {
          label: "Request for Troubleshooting",
          value: "troubleshooting",
          next: "location-name",
          $select: {
            stepId: "95e31fe1-9b6f-4a41-8150-284b6162bb5b",
            journeyId,
          },
        },
      ],
    },
  },
  "location-name": {
    title: "Support",
    body: "What location are you contacting us about?",
    $enter: {
      stepId: "befd65ef-a0ee-4bc3-be61-548be3fef0a0",
      journeyId,
    },
    input: {
      type: "choice",
      set: "location",
      choices: [
        {
          label: "Location 1",
          value: "location-1",
          next: "location-phone",
          $select: {
            stepId: "",
            journeyId,
          },
        },
        {
          label: "Location 2",
          value: "location-2",
          next: "location-phone",
          $select: {
            stepId: "",
            journeyId,
          },
        },
        {
          label: "Location 3",
          value: "location-3",
          next: "location-phone",
          $select: {
            stepId: "",
            journeyId,
          },
        },
      ],
    },
  },
  "location-phone": {
    title: "Support",
    body: "What is the phone number at {location}?",
    $enter: {
      stepId: "bfa9057f-f134-4c7d-a65c-84807ecf2863",
      journeyId,
    },
    input: {
      type: "text",
      set: "locationPhone",
      isValid: (val) => val.length === 10,
      $invalid: {
        stepId: "a17eee61-8f39-4f8d-bf9b-e132f76e3e8d",
        journeyId,
      },
      next: "location-id",
    },
  },
  "location-id": {
    title: "Support",
    body: `What is the location's 3 letter identifier?`,
    $enter: {
      stepId: "dfd5197a-5ca9-4c3b-9f80-c46307ffb276",
      journeyId,
    },
    input: {
      type: "text",
      set: "locationId",
      isValid: (val) => /^[A-Za-z]{3}$/g.test(val),
      $invalid: {
        stepId: "873d0f15-25d6-4f90-bb23-015f3df72424",
        journeyId,
      },
      next: "email",
    },
  },
  email: {
    title: "Support",
    body:
      "Do you have an email address or addresses you would like to be contacted regarding this request?",
    $enter: {
      stepId: "fa08941f-6d17-4ff8-b200-7eec14089e8c",
      journeyId,
    },
    input: {
      type: "text",
      inputType: "email",
      set: "email",
      isValid: isValidEmail,
      $invalid: {
        stepId: "019c78a7-b7ff-4cce-9c47-afab3c4da440",
        journeyId,
      },
      next: "button-type",
    },
  },
  "button-type": {
    title: "Support",
    body: "What type of button would you like to order?",
    $enter: {
      stepId: "e49afe2e-7516-427d-9c44-8a9c2e79e5bc",
      journeyId,
    },
    input: {
      type: "choice",
      set: "buttonType",
      choices: [
        {
          label: "Silver buttons",
          value: "silver",
          $select: {
            stepId: "d43f1b2c-926f-44e3-a0af-8a512298b129",
            journeyId,
          },
          next: "button-location",
        },
        {
          label: "Black buttons with white sticker",
          value: "black",
          $select: {
            stepId: "801e50fa-1408-486f-99d5-b237ece44b40",
            journeyId,
          },
          next: "button-location",
        },
      ],
    },
  },
  "button-location": {
    title: "Support",
    body: "What is the name of the button's location?",
    $enter: {
      stepId: "f2101e3b-4fbb-48c0-9043-61b3fef13f9b",
      journeyId,
    },
    input: {
      type: "text",
      set: "buttonLocation",
      isValid: (val) => val.length > 0,
      next: "location-asset-name",
    },
  },
  "location-asset-name": {
    title: "Support",
    body: "What is the location/asset name?",
    $enter: {
      stepId: "01a5b0ff-84ab-48b6-975e-1e1aca29cf13",
      journeyId,
    },
    input: {
      type: "text",
      set: "locationAssetName",
      isValid: (val) => val.length > 0,
      next: "shipping-method",
    },
  },
  "shipping-method": {
    title: "Support",
    body: "How would you like this shipped?",
    $enter: {
      stepId: "8a79c8cf-6397-4e5a-b559-6a2e4319ee5f",
      journeyId,
    },
    buttonLabel: "Submit order",
    input: {
      type: "choice",
      set: "shippingMethod",
      choices: [
        {
          label: "UPS Ground",
          value: "ups-ground",
          $select: {
            stepId: "168b8642-9082-4528-a2f8-8fbf53debbf5",
            journeyId,
          },
          next: "any-more-buttons",
          action: "orderButton",
        },
        {
          label: "UPS 2nd Day Air",
          value: "ups-air",
          $select: {
            stepId: "1709143c-bbee-4047-b699-d6f3d3c56197",
            journeyId,
          },
          next: "any-more-buttons",
          action: "orderButton",
        },
        {
          label: "UPS Overnight",
          value: "ups-overnight",
          $select: {
            stepId: "1478556b-24f6-48ba-93fb-855a9c20b33d",
            journeyId,
          },
          next: "any-more-buttons",
          action: "orderButton",
        },
      ],
    },
  },
  "any-more-buttons": {
    title: "Support",
    body: "Your order has been placed. Do you need any more buttons?",
    $enter: {
      stepId: "0e447819-1e0f-4016-a5a0-ac8c0cf3db6d",
      journeyId,
    },
    input: {
      type: "choice",
      immediate: true,
      choices: [
        {
          label: "Yes",
          value: "yes",
          $select: {
            stepId: "5f6a141f-bf94-4ad4-af35-2895207de2a1",
            journeyId,
          },
          next: "button-type",
        },
        {
          label: "No",
          value: "no",
          $select: {
            stepId: "0e9fdf72-2c95-4741-957e-4c1651c0ce71",
            journeyId,
          },
          next: "anything-else",
        },
      ],
    },
  },
  "anything-else": {
    title: "Support",
    body: "Can we help you with anything else?",
    input: {
      type: "choice",
      immediate: true,
      choices: [
        {
          label: "Yes",
          value: "yes",
          next: "root",
        },
        {
          label: "No",
          value: "no",
          next: "end",
          action: "end",
        },
      ],
    },
  },
  end: {
    title: "Support",
    body:
      "Thank you for reaching out to us! A ticket has been created and you will be receiving an email confirmation of your request soon.",
    $enter: {
      stepId: "4b3040b0-efb0-4cd3-8454-71c7a0339782",
      journeyId,
    },
    buttonLabel: "End",
  },
};
