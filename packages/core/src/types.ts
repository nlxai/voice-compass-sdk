export interface StepData {
  stepId?: string;
  journeyId?: string;
  forceEnd?: boolean;
  forceEscalate?: boolean;
  forceAutomate?: boolean;
  bidirectional?: boolean;
  payload?: object;
}
