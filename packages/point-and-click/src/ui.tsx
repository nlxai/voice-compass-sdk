import { h, type FunctionalComponent as FC } from "preact";

export const SimpleCheckbox: FC<{
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <label class="text-xs">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          onChange(!checked);
        }}
      />
      <span class="text-xs">{label}</span>
    </label>
  );
};

export const BackButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={(ev: any) => {
      ev.stopPropagation();
      onClick();
    }}
    class="flex text-xs items-center space-x-2 px-1 py-0.5 relative -left-1 rounded text-blue-600 hover:text-blue-800 hover:bg-blue-50"
  >
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.8583 10L6 8.825L2.2915 5L6 1.175L4.8583 -9.98106e-08L4.37114e-07 5L4.8583 10Z"
        fill="currentColor"
      />
    </svg>
    <span>Back</span>
  </button>
);

export const RemoveButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    class="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-1 py-0.5 relative -left-1 rounded"
    onClick={() => {
      onClick();
    }}
  >
    Remove
  </button>
);

export const SimpleSelect = <Value extends unknown>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: Value;
  options: { value: Value; label: string }[];
  onChange: (val: Value) => void;
}) => {
  return (
    <div class="text-xs">
      <span class="text-gray-600">{label}:</span>{" "}
      <select
        class="bg-gray-100 px-1 text-gray-800 !cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg"
        value={String(value)}
        onChange={(ev: any) => {
          onChange(ev.target.value);
        }}
      >
        {options.map((option) => (
          <option value={String(option.value)}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export const ToggleButton: FC<{
  label: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ label, onClick, isActive }) => (
  <button
    class={`rounded-lg px-2 text-xs border transition-colors ${
      isActive
        ? "text-blue-600 border-blue-600 bg-blue-50 text-white cursor-default"
        : "border-transparent bg-gray-100 hover:text-blue-600 hover:bg-blue-50"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export const Switch: FC<{
  checked: boolean;
  onChange: (newChecked: boolean) => void;
  label?: string;
}> = (props) => {
  return (
    <label className="relative flex items-center group space-x-1">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={props.checked}
        onChange={(ev: any) => {
          props.onChange(ev.target.checked);
        }}
      />
      <span
        className={[
          "flex items-center flex-shrink-0 w-6 h-3 p-0.5 rounded-full duration-200",
          // Undo the effect of `space-x-2` on the parent since this is technically the first child (input is visually hidden)
          "!ml-0",
          "bg-gray-300",
          "peer-checked:bg-blue-500 peer-disabled:opacity-50",
          "after:w-2 after:h-2 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3",
        ].join(" ")}
      ></span>
      <span className="text-xs peer-disabled:text-black40">
        {props.label || ""}
      </span>
    </label>
  );
};
