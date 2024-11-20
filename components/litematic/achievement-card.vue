<script setup lang="ts">
import type { IMachine } from '~/types/machine';

defineProps<{
  machine: IMachine;
}>();
</script>

<template>
  <div class="achievement-card">
    <div class="inline-flex items-end gap-1">
      <h3 class="title">
        {{ machine.name }}
      </h3>
      <h4 class="suffix">{{ machine.category }}</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.achievement-card {
  @apply w-full h-[55px] hover:translate-x-3 cursor-pointer hover:brightness-[1.25] transition-all duration-300 select-none border-[9px] rounded-2xl bg-[rgb(33,33,33)] flex items-center px-2;
  border-image: url('~/assets/images/border.png') 9;

  .title {
    @apply text-[14px] text-neutral-400;
  }

  .suffix {
    @apply text-[11px] text-neutral-600;
  }
}
</style>
