<script setup lang="ts">
import AchievementCard from './achievement-card.vue';
import { machines } from 'assets/data/machines';
</script>

<template>
  <div class="w-full h-full flex flex-col gap-1">
    <AchievementCard v-for="(m, idx) in machines" :key="idx" :machine="m" />
  </div>
</template>

<style lang="scss" scoped></style>
