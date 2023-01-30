import { h, render, type FunctionalComponent as FC } from "preact";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type StateUpdater,
} from "preact/hooks";
import { BackButton, RemoveButton, SimpleSelect, Switch } from "./ui";
import { type Step, type Link, type Event } from "./types";
import { fetchSteps, updateSteps } from "./api";
import { getLinks, toSelector } from "./logic";
import { useDrag } from "./drag";

export { type Step, type Link, type Trigger } from "./types";
export { toSelector } from "./logic";

const Wizard: FC<{ apiKey: string }> = (props) => {
  const token = useRef<string>("");
  const journeyId = useRef<string>("");

  const [savedSteps, setSavedSteps] = useState<"loading" | "error" | Step[]>(
    "loading"
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [stepsDraft, setStepsDraft] = useState<null | Step[]>(null);

  const [editedStepKey, setEditedStepKey] = useState<null | string>(null);

  const drag = useDrag();

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    token.current = params.get("token") || "";
    journeyId.current = params.get("journeyId") || "";
    fetchSteps({
      journeyId: journeyId.current,
      token: token.current,
      apiKey: props.apiKey,
    }).then((steps) => {
      if (steps) {
        setSavedSteps(steps);
      } else {
        setSavedSteps("error");
      }
    });
  }, [props.apiKey]);

  return (
    <div
      class="w-96 fixed top-4 left-4 bg-white shadow-lg font-sans rounded-lg"
      style={`z-index: 100000; transform: translate3d(${drag.position[0]}px, ${drag.position[1]}px, 0)`}
    >
      <div
        class="px-2 py-1 cursor-move sticky top-0 text-base py-1 bg-black rounded-t-lg text-white flex items-center justify-between"
        onMouseDown={drag.onMouseDown}
      >
        <p>Journey Wizard</p>
        <div class="flex items-center space-x-2">
          <button
            class="text-xs cursor-pointer py-0.5 px-2 rounded text-gray-200 hover:text-indigo-200 hover:bg-indigo-900 disabled:text-gray-500 disabled:hover:text-gray-500 disabled:hover:bg-transparent disabled:cursor-auto"
            onClick={
              stepsDraft
                ? () => {
                    setIsSaving(true);
                    updateSteps({
                      journeyId: journeyId.current,
                      token: token.current,
                      steps: stepsDraft,
                      apiKey: props.apiKey,
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
          <p class="p-2 text-xs text-gray-600">Loading steps...</p>
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
                />
              </div>
            ) : (
              (stepsDraft || savedSteps).map((step) => (
                <StepSummary
                  key={step.key}
                  step={step}
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

const eventOptions: { label: string; value: Event }[] = [
  { value: "click", label: "Click" },
  { value: "invalid", label: "Invalid" },
  { value: "inserted", label: "Inserted" },
];

const StepEditor: FC<{
  step: Step;
  setStep: StateUpdater<Step | null>;
  onBackButtonClick?: () => void;
}> = ({ step, setStep, onBackButtonClick }) => {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerText = `
    [data-vc-active] {
      outline: 1px solid #fbbf24;
      outline-offset: 2px;
    }
    [data-vc-hovered] {
      outline: 1px solid #60a5fa;
      outline-offset: 2px;
    }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  useEffect(() => {
    if (step.trigger) {
      const selector = toSelector(step.trigger.path);
      const elements = document.querySelectorAll(selector);
      elements.forEach((element: any) => {
        element.setAttribute("data-vc-active", "true");
      });
      return () => {
        elements.forEach((element: any) => {
          element.removeAttribute("data-vc-active");
        });
      };
    }
  }, [step.trigger]);

  const handleBodyClick = useCallback(
    (ev: any) => {
      if (isInsideComponent(ev.target)) {
        return;
      }
      ev.preventDefault();
      setStep(
        (prev) =>
          prev && {
            ...prev,
            trigger: {
              event: "click",
              path: getLinks(ev.target),
            },
          }
      );
    },
    [setStep]
  );

  const handleMouseOver = useCallback((ev: any) => {
    if (isInsideComponent(ev.target)) {
      return;
    }
    const element = ev.target;
    element.setAttribute("data-vc-hovered", "true");
  }, []);

  const handleMouseOut = useCallback((ev: any) => {
    const element = ev.target;
    element.removeAttribute("data-vc-hovered");
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div class="space-y-2">
      <div>
        {onBackButtonClick && <BackButton onClick={onBackButtonClick} />}
        <input
          class="font-medium py-0.5 focus:outline-blue-300 outline-offset-2"
          placeholder="Enter name"
          value={step.name}
          onInput={(ev: any) => {
            setStep(
              (prev) =>
                prev && {
                  ...prev,
                  name: ev.target.value,
                }
            );
          }}
        >
          {step.name}
        </input>
        <p class="mt-1 font-mono text-xs text-gray-500">{step.key}</p>
      </div>
      <hr />
      <div class="space-y-2">
        <p class="text-sm font-medium">Trigger</p>

        {step.trigger ? (
          <div class="space-y-2">
            <SimpleSelect
              label="Event"
              value={step.trigger.event}
              options={eventOptions}
              onChange={(ev: Event) => {
                setStep(
                  (prev) =>
                    prev && {
                      ...prev,
                      trigger: prev.trigger && {
                        ...prev.trigger,
                        event: ev,
                      },
                    }
                );
              }}
            />
            <div class="flex flex-wrap space-x-1">
              <span class="text-xs text-gray-600">Path:</span>
              {step.trigger.path.map((link, index) => {
                return (
                  <LinkEditor
                    key={index}
                    value={link}
                    onChange={(newLink) => {
                      setStep(
                        (prev) =>
                          prev && {
                            ...step,
                            trigger: step.trigger && {
                              ...step.trigger,
                              path: step.trigger.path.map((link, i) =>
                                i === index ? newLink : link
                              ),
                            },
                          }
                      );
                    }}
                  />
                );
              })}
            </div>
            <RemoveButton
              onClick={() => {
                setStep(
                  (prev) =>
                    prev && {
                      ...prev,
                      trigger: null,
                    }
                );
              }}
            />
          </div>
        ) : (
          <p class="text-gray-400 text-xs">
            Select a page element to trigger the step.
          </p>
        )}
      </div>
    </div>
  );
};

const LinkEditor: FC<{ value: Link; onChange: (val: Link) => void }> = ({
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDetailsElement>(null);

  const handleBodyClick = useCallback((ev: any) => {
    if (containerRef.current && !ev.target.contains(containerRef.current)) {
      // TODO: currently does not work because the shadow root propagates events differently, need to understand this better
      // containerRef.current.removeAttribute("open");
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <details
      class="relative z-20 cursor-pointer open:drop-shadow-lg"
      ref={containerRef}
    >
      <summary class="list-none bg-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-2 text-xs">
        {value.tagName.value}
      </summary>
      <div class="text-left w-40 absolute -bottom-1 rounded-lg z-20 transform translate-y-full bg-white">
        <div class="p-1">
          <Switch
            label="Enabled"
            checked={value.enabled}
            onChange={(val) => {
              onChange({
                ...value,
                enabled: val,
              });
            }}
          />
        </div>
        {value.enabled && (
          <>
            <hr />
            <div class="p-1">
              <Switch
                label="Tag name"
                checked={value.tagName.enabled}
                onChange={(val) => {
                  onChange({
                    ...value,
                    tagName: {
                      ...value.tagName,
                      enabled: val,
                    },
                  });
                }}
              />
            </div>
            {value.id && (
              <div class="p-1">
                <Switch
                  label="ID"
                  checked={value.id.enabled}
                  onChange={(val) => {
                    onChange({
                      ...value,
                      id: value.id && {
                        ...value.id,
                        enabled: val,
                      },
                    });
                  }}
                />
              </div>
            )}
            {value.index && (
              <div class="p-1">
                <Switch
                  label="Order"
                  checked={value.index.enabled}
                  onChange={(val) => {
                    onChange({
                      ...value,
                      index: value.index && {
                        ...value.index,
                        enabled: val,
                      },
                    });
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </details>
  );
};

const StepSummary: FC<{ step: Step; onSelect: () => void }> = ({
  step,
  onSelect,
}) => (
  <button
    class="flex items-center justify-between text-left w-full px-2 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
    onClick={onSelect}
  >
    <div>
      {step.name ? (
        <h2 class="text-base font-medium">{step.name}</h2>
      ) : (
        <h2 class="text-base font-medium text-gray-500">Untitled</h2>
      )}
      <p class="font-mono text-xs text-gray-500">{step.key}</p>
    </div>
    {step.trigger && (
      <span class="inline-block flex-none w-6 h-6 text-gray-400">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
        </svg>
      </span>
    )}
  </button>
);

const Nothing = () => null;

customElements.define(
  "point-and-click",
  class extends HTMLElement {
    container = document.createElement("div");
    root: any;

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
      ` + String.raw`TAILWIND`;
      shadow.appendChild(style);
      shadow.appendChild(this.container);
    }

    set apiKey(val: string) {
      this.root = render(<Wizard apiKey={val} />, this.container);
    }

    disconnectedCallback() {
      // Unmount hack per https://github.com/preactjs/preact/issues/53#issuecomment-184868295
      render(<Nothing />, this.container, this.root);
    }
  }
);
