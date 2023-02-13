import { h, type FunctionalComponent as FC } from "preact";
import { useState, useEffect } from "preact/hooks";

export const MatchCounter: FC<{
  selector: string;
}> = ({ selector }) => {
  const [numberOfElementsFound, setNumberOfElementsFound] = useState(0);

  useEffect(() => {
    try {
      const elems = document.querySelectorAll(selector);
      setNumberOfElementsFound(elems.length);
    } catch (e) {
      setNumberOfElementsFound(0);
    }
  }, [selector]);

  return (
    <p class="text-gray-400 text-xs flex items-center space-x-1">
      <span
        class={`w-1 h-1 inline-block rounded-full ${
          numberOfElementsFound === 1 ? "bg-green-500" : "bg-amber-500"
        }`}
      ></span>
      <span>
        {numberOfElementsFound} element
        {numberOfElementsFound !== 1 && "s"} found for this selector
      </span>
    </p>
  );
};
