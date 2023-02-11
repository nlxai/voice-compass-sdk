import { h, type FunctionalComponent as FC, RefObject } from "preact";
import {
  useMemo,
  useEffect,
  useCallback,
  type StateUpdater,
} from "preact/hooks";
import { BackButton, RemoveButton, SimpleSelect, ToggleButton } from "../ui";
import { type Step, type Event, type Bounding, type Trigger } from "../types";
import { getLinks, toSelector } from "../logic";
import { TriggerIcon, RemoveCircleOutlineIcon } from "../icons";
import { LinkEditor } from "./LinkEditor";
import { MatchCounter } from "./MatchCounter";
import { SpeechSynthesis } from "./SpeechSynthesis";

const eventOptions: { label: string; value: Event }[] = [
  { value: "click", label: "Click" },
  { value: "invalid", label: "Invalid form input" },
  { value: "start", label: "Journey start" },
  { value: "inserted", label: "Appear on page" },
];

const isInsideComponent = (element: HTMLElement): boolean => {
  const containerWithCustomElementWrapper =
    document.querySelector("point-and-click");

  return Boolean(
    containerWithCustomElementWrapper &&
      (containerWithCustomElementWrapper.contains(element) ||
        containerWithCustomElementWrapper === element)
  );
};

export const StepEditor: FC<{
  step: Step;
  setStep: StateUpdater<Step | null>;
  getParentBound: () => Bounding;
  onBackButtonClick?: () => void;
  apiKey: string;
  // The token does not need to be reactive as it is set at the beginning and never changes
  // using a ref here to avoid re-renders.
  token: RefObject<string>;
}> = ({ step, setStep, onBackButtonClick, getParentBound, apiKey, token }) => {
  const basedOn = useMemo<"css" | "html">(
    () => (typeof step.trigger?.selector === "string" ? "css" : "html"),
    [step.trigger]
  );

  const updateCssSelector = (e: any) => {
    const selector = e.target.value;
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

  const currentSelector = useMemo(() => {
    return (
      step.trigger?.selector ??
      ((step.trigger?.path && toSelector(step.trigger.path)) || "")
    );
  }, [step.trigger]);

  useEffect(() => {
    if (!currentSelector) {
      return;
    }

    try {
      const elements = document.querySelectorAll(currentSelector);

      elements.forEach((element: any) => {
        element.setAttribute("data-vc-active", "true");
      });
      return () => {
        elements.forEach((element: any) => {
          element.removeAttribute("data-vc-active");
        });
      };
    } catch (err) {
      console.warn(err);
      return;
    }
  }, [currentSelector]);

  const handleBodyClick = useCallback(
    (ev: any) => {
      if (isInsideComponent(ev.target)) {
        return;
      }
      ev.preventDefault();
      ev.stopPropagation();
      setStep((prev) => {
        return (
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
      });
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
  }, [handleBodyClick, handleMouseOver, handleMouseOut]);

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
      {onBackButtonClick && <BackButton onClick={onBackButtonClick} />}
      <div class="!mt-1 flex items-center justify-between">
        <div>
          <input
            class="font-medium text-sm py-0.5 focus:outline-blue-300 outline-offset-2"
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
          <p class="mt-0.5 font-mono text-xs text-gray-500">{step.key}</p>
        </div>
        {step.body && (
          <SpeechSynthesis
            languageCode={/* TODO: handle languages dynamically */ "en-US"}
            transcript={step.body}
            apiKey={apiKey}
            token={token}
          />
        )}
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
                    label="Direct HTML selection"
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
                    label="Custom CSS selector"
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
                  <div>
                    <input
                      type="text"
                      class="border-b pt-0.5 pb-px mt-2 font-mono block w-full text-xs border-gray-300 focus:outline-0 focus:border-voiceCompassPurpleDarker"
                      placeholder="Enter selector"
                      value={step.trigger.selector}
                      onInput={updateCssSelector}
                    />
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
                {currentSelector && <MatchCounter selector={currentSelector} />}
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
