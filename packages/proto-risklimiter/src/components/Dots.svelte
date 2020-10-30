<style>
  .dots {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .dots > * + * {
    margin-left: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    animation: bounce 1s infinite ease-in-out;
  }

  .dot:nth-of-type(1) {
    animation-delay: 0s;
  }

  .dot:nth-of-type(2) {
    animation-delay: -0.15s;
  }

  .dot:nth-of-type(3) {
    animation-delay: -0.3s;
  }

  @keyframes bounce {
    0% {
      transform: translate3d(0, 0, 0);
    }

    30% {
      transform: translate3d(0, -3px, 0);
    }

    60% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
    }
  }
</style>

<div class="dots">
  <div class="dot" />
  <div class="dot" />
  <div class="dot" />
</div>
