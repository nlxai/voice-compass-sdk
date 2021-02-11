<script lang="ts">
  import { tw } from "twind";
  import { onMount, onDestroy } from "svelte";
  import CameraIcon from "./Icons/CameraIcon.svelte";

  let videoRef: HTMLVideoElement;
  let canvasRef: HTMLCanvasElement;

  let stream: MediaStream | undefined;

  let captured = false;

  let error: string | undefined = undefined;

  const handleSuccess = (stream: MediaStream) => {
    videoRef.srcObject = stream;
  };

  const captureFrame = () => {
    if (canvasRef && videoRef) {
      const context = canvasRef.getContext("2d");
      const width = videoRef.offsetWidth;
      const height = videoRef.offsetHeight;
      canvasRef.width = width;
      canvasRef.height = height;
      context.drawImage(videoRef, 0, 0, width, height);
      captured = true;
    }
  };

  onMount(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });
      stream = newStream;
      handleSuccess(newStream);
    } catch (err) {
      error = "Cannot access camera.";
    }
  });

  onDestroy(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        stream.removeTrack(track);
      });
    }
  });
</script>

<style>
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(255, 255, 255, 0.2);
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
</style>

<div class={tw`border-4 border-green-500 bg-gray-300 relative`}>
  {#if error}
    <p>{error}</p>
  {:else}
    <video
      class={tw(captured ? 'sr-only' : '')}
      bind:this={videoRef}
      playsinline
      autoplay />
    <canvas class={tw(captured ? '' : 'sr-only')} bind:this={canvasRef} />
  {/if}
  {#if !captured}
    <button class={tw`text-white p-4 rounded`} on:click={captureFrame}>
      <CameraIcon size="36" />
    </button>
  {/if}
</div>
