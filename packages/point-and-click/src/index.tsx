import { h, render, type FunctionalComponent as FC } from "preact";
import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  type StateUpdater,
} from "preact/hooks";
import {
  BackButton,
  RemoveButton,
  SimpleSelect,
  Switch,
  ToggleButton,
} from "./ui";
import {
  type Step,
  type Link,
  type Event,
  type Bounding,
  type Trigger,
} from "./types";
import { fetchSteps, updateSteps } from "./api";
import { getLinks, toSelector } from "./logic";
import { useDrag } from "./drag";

export { type Step, type Link, type Trigger } from "./types";
export { toSelector } from "./logic";

const Wizard: FC<{ apiKey: string }> = (props) => {
  const token = useRef<string>("");
  const journeyId = useRef<string>("");
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
      class="w-96 max-h-[320px] overflow-auto fixed top-4 left-4 bg-white shadow-lg font-sans rounded-lg"
      style={`z-index: 100000; transform: translate3d(${drag.position[0]}px, ${drag.position[1]}px, 0)`}
      ref={containerRef}
    >
      <div
        class="relative z-30 px-2 py-1 cursor-move sticky top-0 text-base py-1 bg-black rounded-t-lg text-white flex items-center justify-between"
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
  { value: "invalid", label: "Invalid form input" },
  { value: "start", label: "Journey start" },
  // TODO: implement and add to the UI later
  // { value: "inserted", label: "Appear on page" },
];

const StepEditor: FC<{
  step: Step;
  setStep: StateUpdater<Step | null>;
  getParentBound: () => Bounding;
  onBackButtonClick?: () => void;
}> = ({ step, setStep, onBackButtonClick, getParentBound }) => {
  const [numberOfElementsFound, setNumberOfElementsFound] = useState(0);

  const basedOn = useMemo<"css" | "html">(
    () => (typeof step.trigger?.selector === "string" ? "css" : "html"),
    [step.trigger]
  );

  const updateCssSelector = (e: any) => {
    const selector = e.target.value;
    try {
      setNumberOfElementsFound(document.querySelectorAll(selector).length);
    } catch (e) {
      setNumberOfElementsFound(0);
    }
    setStep(
      (prev) =>
        prev && {
          ...prev,
          trigger: prev.trigger && {
            ...prev.trigger,
            selector,
          },
        }
    );
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerText = `
    [data-vc-hovered] {
      outline: 1px solid #60a5fa;
      outline-offset: 2px;
    }
    [data-vc-active] {
      outline: 1px solid #fbbf24;
      outline-offset: 2px;
    }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  useEffect(() => {
    const selector = step.trigger?.selector
      ? step.trigger.selector
      : step.trigger?.path && toSelector(step.trigger.path);

    if (!selector) {
      return;
    }

    try {
      const elements = document.querySelectorAll(selector);

      setNumberOfElementsFound(elements.length);

      elements.forEach((element: any) => {
        element.setAttribute("data-vc-active", "true");
      });
      return () => {
        elements.forEach((element: any) => {
          element.removeAttribute("data-vc-active");
        });
      };
    } catch (e) {
      // todo: show warning that nothing found
      console.log(e);
      return;
    }
  }, [step.trigger]);

  const handleBodyClick = useCallback(
    (ev: any) => {
      if (isInsideComponent(ev.target)) {
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();
      setStep(
        (prev) =>
          prev && {
            ...prev,
            trigger: prev.trigger
              ? {
                  ...prev.trigger,
                  path: getLinks(ev.target),
                }
              : {
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
    document.body.addEventListener("click", handleBodyClick, true);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.body.removeEventListener("click", handleBodyClick, true);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const modifyTrigger = (
    fn: (prevTrigger: Trigger | undefined) => Trigger | undefined
  ) => {
    setStep(
      (prev) =>
        prev && {
          ...prev,
          trigger: fn(prev.trigger),
        }
    );
  };

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
        <p class="text-sm font-medium flex items-center space-x-1">
          <span class="w-4 h-4 inline-block">
            <TriggerIcon />
          </span>
          <span>Trigger</span>
          {!step.trigger && (
            <span class="text-gray-500 px-2 block !ml-2 uppercase text-[10px] bg-gray-100 rounded">
              not set
            </span>
          )}
        </p>

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
            {step.trigger.event !== "start" && (
              <>
                <div class="flex flex-wrap space-x-1 space-y-1">
                  <span class="text-xs text-gray-600 mt-1">Base on:</span>
                  <ToggleButton
                    isActive={basedOn === "html"}
                    label="direct HTML selection"
                    onClick={() => {
                      modifyTrigger(
                        (prev) =>
                          prev && {
                            ...prev,
                            selector: undefined,
                          }
                      );
                    }}
                  />
                  <span class="text-xs text-gray-600 mt-1">or</span>
                  <ToggleButton
                    isActive={basedOn === "css"}
                    label="custom CSS selector"
                    onClick={() => {
                      modifyTrigger(
                        (prev) =>
                          prev && {
                            ...prev,
                            selector: "",
                          }
                      );
                    }}
                  />
                </div>
                {typeof step.trigger.selector === "string" ? (
                  <div class="space-y-1">
                    <input
                      type="text"
                      class="border-b py-0.5 font-mono block w-full text-xs border-gray-300 focus:outline-0 focus:border-blue-600"
                      placeholder="Enter selector"
                      value={step.trigger.selector}
                      onInput={updateCssSelector}
                    />
                    <p class="text-xs text-gray-400">
                      {numberOfElementsFound} element
                      {numberOfElementsFound !== 1 && "s"} found for this
                      selector
                    </p>
                  </div>
                ) : (
                  <div class="flex flex-wrap space-x-1 space-y-1">
                    <span class="text-xs text-gray-600 self-end">Path:</span>
                    {step.trigger.path ? (
                      <>
                        {step.trigger.path.map((link, index) => {
                          return (
                            <LinkEditor
                              key={index}
                              value={link}
                              getParentBound={getParentBound}
                              onChange={(newLink) => {
                                setStep(
                                  (prev) =>
                                    prev && {
                                      ...prev,
                                      trigger: prev.trigger && {
                                        ...prev.trigger,
                                        path: (prev.trigger.path || []).map(
                                          (link, i) =>
                                            i === index ? newLink : link
                                        ),
                                      },
                                    }
                                );
                              }}
                            />
                          );
                        })}
                        <button
                          className="inline-block w-4 h-4 p-[1px] text-gray-500 hover:text-red-600"
                          title="Remove"
                          onClick={() => {
                            modifyTrigger(
                              (prev) =>
                                prev && {
                                  ...prev,
                                  path: undefined,
                                }
                            );
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </button>
                      </>
                    ) : (
                      <p className="text-xs text-gray-400">
                        Select an element on the page.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
            <RemoveButton
              label="Remove trigger"
              onClick={() => {
                modifyTrigger(() => undefined);
              }}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <p class="text-gray-600 text-xs">
              Triggers define the user interaction that will trigger this step
              during the journey.
            </p>
            <ToggleButton
              onClick={() => {
                modifyTrigger(() => ({
                  event: "click",
                }));
              }}
              label="Set trigger"
              isActive={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const LinkEditor: FC<{
  value: Link;
  onChange: (val: Link) => void;
  getParentBound: () => Bounding;
}> = ({ value, onChange, getParentBound }) => {
  const containerRef = useRef<HTMLDetailsElement>(null);

  const [isTooRigth, setIsTooRight] = useState<Boolean>(false);
  const [isTooTop, setIsTooTop] = useState<Boolean>(false);

  const handleBodyClick = useCallback((ev: any) => {
    if (containerRef.current && !ev.target.contains(containerRef.current)) {
      // TODO: currently does not work because the shadow root propagates events differently, need to understand this better
      // containerRef.current.removeAttribute("open");
    }
  }, []);

  const handleToggle = (ev: any) => {
    const parentBounding = getParentBound();
    const dropdown = ev.target.querySelector("div");
    const dropdownBounding = dropdown.getBoundingClientRect();

    if (dropdownBounding.right > parentBounding.right - 20) {
      // 20 is just for savety, scrollbars, other things
      setIsTooRight(true);
    }

    if (dropdownBounding.top < parentBounding.top + 50) {
      // todo
      // 50 includes 20 for safety plus current height of the "top bar", should be a variable also
      setIsTooTop(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <details
      class="cursor-pointer open:drop-shadow-lg"
      ref={containerRef}
      onToggle={handleToggle}
    >
      <summary class="list-none bg-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-2 text-xs">
        {value.tagName.value}
      </summary>
      <div
        class={`text-left w-40 absolute -top-1 rounded-lg z-20 transform -translate-y-full bg-white ${
          isTooRigth && "-translate-x-full"
        } ${isTooTop && "translate-y-1/3"}`}
      >
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

const TriggerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
  </svg>
);

const RemoveCircleOutlineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
  </svg>
);

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
        <TriggerIcon />
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
