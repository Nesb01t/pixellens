<script setup lang="ts"></script>

<template>
  <div class="pattern inset-0 absolute">
    <div class="pattern-gradient absolute bottom-0" />
  </div>
</template>

<style lang="scss" scoped>
$bg: #1d1d1d;
$bg2: #4e4f51;
$bg3: #3c3c3c;
$size: 200px;

.pattern {
  width: 100%;
  height: 100%;

  background:
    repeating-conic-gradient(from 30deg, #0000 0 120deg, $bg3 0 180deg) calc(0.5 * $size) calc(0.5 * $size * 0.577),
    repeating-conic-gradient(from 30deg, $bg 0 60deg, $bg2 0 120deg, $bg3 0 180deg);
  background-size: $size calc($size * 0.577);
}

.pattern-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(37.5deg, transparent 0, $bg 40%);
}
</style>
