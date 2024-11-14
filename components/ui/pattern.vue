<script setup lang="ts"></script>

<template>
  <div class="pattern">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$bg: #eaeaea; // #121212
$bg2: #fafafa; // #1a1a1a

.pattern {
  @apply w-full h-full flex justify-center items-center;

  animation: move 4s linear infinite;
  background: #121212;
  background: linear-gradient(135deg, $bg 25%, $bg2 25%, $bg2 50%, $bg 50%, $bg 75%, $bg2 75%, $bg2);
  background-size: 40px 40px;
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}
</style>
