<script setup lang="ts"></script>

<template>
  <div class="pattern-wrapper">
    <div class="pattern absolute inset-0" />
    <div class="pattern-gradient inset-0 absolute" />
  </div>
</template>

<style lang="scss" scoped>
$bg: #252423;
$bg2: #3f3d3c;
$bg3: #2d2b2b;
$size: 145px;

.pattern-wrapper {
  @apply absolute inset-0;
  width: 100%;
  height: 100%;
}

.pattern {
  z-index: 0;
  width: 100%;
  height: 100%;

  animation: flow 30s linear infinite;
  background:
    repeating-conic-gradient(from 30deg, #0000 0 120deg, $bg3 0 180deg) calc(0.5 * $size) calc(0.5 * $size * 0.577),
    repeating-conic-gradient(from 30deg, $bg 0 60deg, $bg2 0 120deg, $bg3 0 180deg);
  background-size: $size calc($size * 0.577);
}

.pattern-gradient {
  z-index: 0;

  width: 100%;
  height: 100%;
  background: linear-gradient(37.5deg, transparent 0, $bg 40%);
}

@keyframes flow {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(345px);
  }
}
</style>
