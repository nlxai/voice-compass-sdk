import { h, render, type FunctionalComponent as FC } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { type Step } from "./types";
import { fetchSteps, updateSteps } from "./api";
import { useDrag } from "./drag";
import { AutoFixHighIcon, TriggerIcon } from "./icons";
import { StepEditor } from "./components/StepEditor";
import { SpeechSynthesis } from "./components/SpeechSynthesis";

export { type Step, type Link, type Trigger } from "./types";
export { toSelector } from "./logic";

const Wizard: FC<{
  apiKey: string;
  token: string;
  journeyId: string;
  dev: boolean;
}> = (props) => {
  const containerRef = useRef<any>(null);

  const [savedSteps, setSavedSteps] = useState<"loading" | "error" | Step[]>(
    "loading"
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [stepsDraft, setStepsDraft] = useState<null | Step[]>(null);

  const [editedStepKey, setEditedStepKey] = useState<null | string>(null);

  const drag = useDrag();

  const getParentBound = () => containerRef?.current?.getBoundingClientRect();

  useEffect(() => {
    fetchSteps({
      journeyId: props.journeyId,
      token: props.token,
      apiKey: props.apiKey,
      dev: props.dev,
    })
      .then((steps) => {
        if (!steps) {
          throw new Error("");
        }
        setSavedSteps(steps);
      })
      .catch(() => {
        setSavedSteps("error");
      });
  }, [props.apiKey, props.token, props.journeyId]);

  return (
    <div
      class="w-96 max-h-[320px] overflow-auto text-gray-900 fixed top-4 left-4 bg-white border border-gray-100 shadow-xl font-system rounded-lg"
      style={`z-index: 100000; transform: translate3d(${drag.position[0]}px, ${drag.position[1]}px, 0)`}
      ref={containerRef}
    >
      <div
        class="relative z-30 bg-white px-2 py-2 border-b border-gray-200 cursor-move sticky top-0 text-base rounded-t-lg flex items-center justify-between"
        onMouseDown={drag.onMouseDown}
      >
        <div class="flex items-center space-x-1.5">
          <span class="w-4 h-4 inline-block flex-none">
            <AutoFixHighIcon />
          </span>
          <p class="text-sm">Journey Wizard</p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="text-xs cursor-pointer py-0.5 px-2 text-white rounded bg-voiceCompassPurple hover:bg-voiceCompassPurpleDarker disabled:opacity-30 disabled:hover:bg-voiceCompassPurple disabled:cursor-auto"
            onClick={
              stepsDraft
                ? () => {
                    setIsSaving(true);
                    updateSteps({
                      steps: stepsDraft,
                      token: props.token,
                      apiKey: props.apiKey,
                      journeyId: props.journeyId,
                      dev: props.dev,
                    })
                      .then((res) => {
                        setStepsDraft(null);
                        setSavedSteps(res);
                      })
                      .catch((err) => {
                        console.warn(err);
                      })
                      .finally(() => {
                        setIsSaving(false);
                      });
                  }
                : undefined
            }
            disabled={!stepsDraft || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div>
        {savedSteps === "loading" ? (
          <p class="p-2 text-xs text-gray-600 text-center">Loading steps...</p>
        ) : savedSteps === "error" ? (
          <p class="p-2 text-xs text-red-600">
            Something went wrong. Please open the page again from the journey
            edit page on the Voice Compass Portal.
          </p>
        ) : (
          (() => {
            const steps = stepsDraft || savedSteps;
            const editedStep =
              editedStepKey && steps.find((s) => s.key === editedStepKey);

            return editedStep ? (
              <div class="p-2 space-y-2">
                <StepEditor
                  step={editedStep}
                  setStep={(updater) =>
                    setStepsDraft(
                      steps.map((s) =>
                        s.key === editedStepKey
                          ? typeof updater === "function"
                            ? updater(s) || s
                            : updater || s
                          : s
                      )
                    )
                  }
                  onBackButtonClick={() => {
                    setEditedStepKey(null);
                  }}
                  getParentBound={getParentBound}
                  apiKey={props.apiKey}
                  token={props.token}
                  dev={props.dev}
                />
              </div>
            ) : (
              (stepsDraft || savedSteps).map((step) => (
                <StepSummary
                  key={step.key}
                  step={step}
                  dev={props.dev}
                  apiKey={props.apiKey}
                  token={props.token}
                  onSelect={() => {
                    setEditedStepKey(step.key);
                  }}
                />
              ))
            );
          })()
        )}
      </div>
    </div>
  );
};

export const isInsideComponent = (element: HTMLElement): boolean => {
  const containerWithCustomElementWrapper =
    document.querySelector("point-and-click");

  return Boolean(
    containerWithCustomElementWrapper &&
      (containerWithCustomElementWrapper.contains(element) ||
        containerWithCustomElementWrapper === element)
  );
};

const StepSummary: FC<{
  step: Step;
  onSelect: () => void;
  apiKey: string;
  token: string;
  dev: boolean;
}> = ({ step, onSelect, apiKey, token, dev }) => (
  <div class="relative">
    <button
      class="flex items-center text-left space-x-2 w-full px-2 py-2 cursor-pointer hover:bg-voiceCompassPurple05 transition-colors duration-200"
      onClick={onSelect}
    >
      {step.trigger ? (
        <span class="inline-block flex-none w-4 h-4 text-gray-500">
          <TriggerIcon />
        </span>
      ) : (
        <span class="inline-block flex-none w-4 h-4 text-gray-600"></span>
      )}
      <div>
        {step.name ? (
          <h2 class="text-sm font-medium text-gray-900">{step.name}</h2>
        ) : (
          <h2 class="text-sm font-medium text-gray-500">Untitled</h2>
        )}
        <p class="font-mono text-xs text-gray-500">{step.key}</p>
      </div>
    </button>
    {step.body && (
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <SpeechSynthesis
          languageCode={/* TODO: handle languages dynamically */ "en-US"}
          transcript={step.body}
          apiKey={apiKey}
          token={token}
          dev={dev}
        />
      </div>
    )}
  </div>
);

// Preact component that renders an empty node, used for unmounting
const Nothing: FC<{}> = () => null;

customElements.define(
  "point-and-click",
  class extends HTMLElement {
    container = document.createElement("div");
    root: any;
    _apiKey: string | null = null;
    _token: string | null = null;
    _journeyId: string | null = null;
    _dev: boolean | null = null;
    _styleLoaded: boolean = false;

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "closed" });
      const style = document.createElement("style");
      style.textContent =
        `
details summary::-webkit-details-marker,
details summary::marker {
  display: none;
}

details summary:focus {
  outline: none;
}
      ` +
        // This uppercase tailwind string is replaced by the tailwind minified output at build-time
        String.raw`TAILWIND`;
      style.onload = () => {
        this._styleLoaded = true;
        this.render();
      };
      shadow.appendChild(style);
      shadow.appendChild(this.container);
    }

    set apiKey(val: string) {
      this._apiKey = val;
      this.render();
    }

    set dev(val: boolean) {
      this._dev = val;
      this.render();
    }

    set token(val: string) {
      this._token = val;
      this.render();
    }

    set journeyId(val: string) {
      this._journeyId = val;
      this.render();
    }

    render() {
      if (
        this._apiKey &&
        this._token &&
        this._journeyId &&
        typeof this._dev === "boolean" &&
        this._styleLoaded
      ) {
        this.root = render(
          <Wizard
            token={this._token}
            apiKey={this._apiKey}
            dev={this._dev}
            journeyId={this._journeyId}
          />,
          this.container
        );
      }
    }

    disconnectedCallback() {
      // Unmount hack per https://github.com/preactjs/preact/issues/53#issuecomment-184868295
      render(<Nothing />, this.container, this.root);
    }
  }
);
