import { h, type FunctionalComponent as FC } from "preact";
import { useState, useEffect } from "preact/hooks";


export const MatchCounter: FC<{ selector: string }> = ({ selector }) => {
  const [numberOfElementsFound, setNumberOfElementsFound] = useState(0);

  useEffect(() => {
    try {
      const elems = document.querySelectorAll(selector);
      setNumberOfElementsFound(elems.length);
    } catch (e) {
      setNumberOfElementsFound(0);
    }
  }, [selector])

	return (<p class={`text-xs ${numberOfElementsFound === 0 ? "text-amber-500" : "text-gray-400"}`}>
		{numberOfElementsFound} element
		{numberOfElementsFound !== 1 && "s"} found for this
		selector
  </p>)
};