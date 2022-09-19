<template>
  <div :class="$style.circle">
  </div>
</template>

<style module lang="scss">
  .circle {
    margin: 15rem auto 0rem auto;
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    margin-left: auto;
    margin-right: auto;
    border: 8px solid transparent;
    border-top: 8px solid rgb(237, 110, 105);
    border-right: 8px solid rgb(237, 110, 105);
    border-bottom: 8px solid rgb(237, 110, 105);
    transition: 1s;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
      0% {
          transform: rotate(0deg);
          border-top-color: rgb(237, 110, 105);
          border-right-color: rgb(237, 110, 105);
          border-bottom-color: rgb(237, 110, 105);
      }
      50% {
        border-top-color: #6803f4;
        border-right-color: #6803f4;
        border-bottom-color: #6803f4;
      }
      100% {
          transform: rotate(360deg);
          border-top-color: rgb(237, 110, 105);
          border-right-color: rgb(237, 110, 105);
          border-bottom-color: rgb(237, 110, 105);
      }
  }
  @-webkit-keyframes spin {
      0% {
          transform: rotate(360deg);
          border-top-color: #E91E63;
          border-right-color: #E91E63;
          border-bottom-color: #E91E63;
      }
      100% {
          transform: rotate(360deg);
          border-top-color: #6803f4;
          border-right-color: #6803f4;
          border-bottom-color: #6803f4;
      }
  }
</style>
