<script setup lang="ts">
import type { IHologramTip } from '~/types/machine';
import Instance from './instance.tres.vue';
import { useModelStore, storeToRefs } from '#build/imports';
import { computed } from 'vue';

const modelStore = useModelStore();
const { machine } = storeToRefs(modelStore);

const tips = computed<IHologramTip[] | undefined>(() => {
  return machine.value?.tips;
});
</script>

<template>
  <Instance v-for="(t, idx) in tips" :key="idx" :data="t" />
</template>

<style scoped lang="scss"></style>
