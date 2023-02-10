import { h, type FunctionalComponent as FC, type RefObject } from "preact";
import { useState } from "preact/hooks";
import { fetchSpeechSynthesis } from "../api";

interface Props {
  transcript: string;
  languageCode?: string;
  apiKey: string;
  token: RefObject<string>;
}

const Play = () => (
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M8 5v14l11-7z"></path>
  </svg>
);

const Close = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    ></path>
  </svg>
);

const Pause = () => (
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
  </svg>
);

export const SpeechSynthesis: FC<Props> = (props) => {
  const [state, setState] = useState<
    { type: "rest" } | { type: "fetching" } | { type: "playing"; audio: any }
  >({
    type: "rest",
  });

  const handleAudioEnd = () => {
    setState({ type: "rest" });
  };

  const [error, setError] = useState<boolean>(false);

  const handleClick = () => {
    if (state.type === "playing") {
      state.audio.pause();
      setState({ type: "rest" });
      return;
    }
    setState({ type: "fetching" });
    fetchSpeechSynthesis({ ...props, token: props.token.current || "" })
      .then((audioUrl: string | null) => {
        if (!audioUrl) {
          throw new Error("Invalid audio URL");
        }
        const audio = new Audio(audioUrl);
        audio.addEventListener("ended", handleAudioEnd, {
          once: true,
        });
        audio.play();
        setState({ type: "playing", audio: audio });
      })
      .catch((err) => {
        setState({ type: "rest" });
        setError(true);
      });
  };

  return (
    <div className="w-4 h-4 inline-block relative">
      <button
        className="w-full h-full inline-flex flex-none items-center justify-center p-0.5 text-white bg-voiceCompassPurple hover:bg-voiceCompassPurpleDarker disabled:hover:bg-voiceCompassPurple rounded-full disabled:opacity-50"
        onClick={handleClick}
        disabled={state.type === "fetching"}
      >
        {state.type === "playing" ? (
          <Pause />
        ) : state.type === "fetching" ? (
          <Play />
        ) : (
          <Play />
        )}
      </button>
      {error && (
        <div className="absolute flex space-x-2 -bottom-2 w-40 right-0 p-1 rounded-lg transform translate-y-full shadow-md bg-white text-redMain text-xs">
          <p>
            Could not generate transcript audio. Please make sure you are using{" "}
            <a
              className="underline"
              href="https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag"
            >
              valid SSML
            </a>{" "}
            and you are not wrapping your transcript in a{" "}
            <span className="font-mono">{"<speak></speak>"}</span> tag .
          </p>
          <button
            className="w-4 h-4 inline-block flex-none hover:bg-redFaint hover:text-redDarker rounded"
            onClick={() => {
              setError(false);
            }}
            title="Close"
          >
            <Close />
          </button>
        </div>
      )}
    </div>
  );
};
