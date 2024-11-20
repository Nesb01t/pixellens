<script setup lang="ts">
import type { IMachine } from '~/types/machine';
import AchievementCard from './achievement-card.vue';

const machines: IMachine[] = [
  {
    name: '刷线机',
    category: '基础',
  },
  {
    name: '养牛机',
    category: '基础',
  },
];
</script>

<template>
  <div class="w-full h-full flex flex-col gap-1">
    <AchievementCard v-for="(m, idx) in machines" :key="idx" :machine="m" />
  </div>
</template>

<style lang="scss" scoped></style>
