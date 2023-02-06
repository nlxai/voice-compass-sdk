import { h, type FunctionalComponent as FC } from "preact";
import { useRef, useState, useCallback, useEffect } from "preact/hooks";
import { type Link, type Bounding } from "../types";
import { Switch } from "../ui";

export const LinkEditor: FC<{
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
        class={`text-left w-40 absolute -top-1 rounded-lg z-20 transform -translate-y-full bg-white animate-firstlyTransparent ${
          isTooRigth && "right-0"
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
