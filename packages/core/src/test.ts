import { create } from "./index";

const vc = create({
  dev: true,
  apiKey: "IsUOusWQbe5xVFbUIqcVu1PeuzGFX9NsIjbu11i3",
  contactId: "",
  journeyId: "PeterTestJourney",
  journeyAssistantId: "88cd8153-dc63-4421-a04c-994ec1b54cdc",
});

vc.runWizard();
