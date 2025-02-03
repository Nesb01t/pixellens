<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
}>();
const isOpen = ref(true);
</script>

<template>
  <div
    class="min-w-[200px] text-[12px] border border-neutral-500/10 shadow-xl text-neutral-300 bg-black select-none bg-opacity-50 pl-3 pr-4 py-[9px] gap-1 flex flex-col items-start"
  >
    <div
      class="flex items-center w-full gap-[6px] cursor-pointer hover:text-orange-400 transition-all duration-300"
      @click="isOpen = !isOpen"
    >
      <Icon v-if="isOpen == false" class="text-lg" name="pixelarticons:checkbox-on" />
      <Icon v-else class="text-lg" name="pixelarticons:checkbox" />
      <div class="text-[13px]">{{ title }}</div>
    </div>

    <div v-if="isOpen" class="text-neutral-400/75">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
