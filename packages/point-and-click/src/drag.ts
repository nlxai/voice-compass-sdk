import { useState, useEffect, useCallback } from "preact/hooks";

const localStorageKey = "vc-position";

export type Pt = [number, number];

export interface Drag {
  start: Pt;
  current: Pt;
}

export interface DragState {
  drag: Drag | null;
  position: Pt;
}

const setPosition = (position: Pt) => {
  localStorage.setItem(localStorageKey, JSON.stringify(position));
};

const getPosition = (): Pt => {
  try {
    const pos = JSON.parse(localStorage.getItem(localStorageKey) || "");
    if (Array.isArray(pos) && pos.length === 2) {
      return pos as Pt;
    }
    throw new Error("Invalid structure");
  } catch (err) {
    return [0, 0];
  }
};

export const useDrag = () => {
  const [d, setD] = useState<DragState>({
    drag: null,
    position: getPosition(),
  });

  useEffect(() => {
    setPosition(d.position);
  }, [d.position]);

  const calcPosition = useCallback(
    (currentD: DragState): [number, number] =>
      currentD.drag
        ? [
            currentD.position[0] +
              currentD.drag.current[0] -
              currentD.drag.start[0],
            currentD.position[1] +
              currentD.drag.current[1] -
              currentD.drag.start[1],
          ]
        : currentD.position,
    []
  );

  const isDragging = Boolean(d.drag);

  const onBodyMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setD((prev) =>
        prev.drag
          ? {
              ...prev,
              drag: { ...prev.drag, current: [e.clientX, e.clientY] },
            }
          : prev
      );
    },
    [setD, isDragging]
  );

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const pt: [number, number] = [e.clientX, e.clientY];
      setD((prev) => ({
        ...prev,
        drag: {
          start: pt,
          current: pt,
        },
      }));
    },
    [setD]
  );

  const onBodyMouseUp = useCallback(() => {
    setD((prev) => ({
      ...prev,
      drag: null,
      position: calcPosition(prev),
    }));
  }, [setD]);

  useEffect(() => {
    document.body.addEventListener("mousemove", onBodyMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", onBodyMouseMove);
    };
  }, [onBodyMouseMove]);

  useEffect(() => {
    document.body.addEventListener("mouseup", onBodyMouseUp);
    return () => {
      document.body.removeEventListener("mouseup", onBodyMouseUp);
    };
  }, [onBodyMouseUp]);

  return {
    position: calcPosition(d),
    onMouseDown,
  };
};
