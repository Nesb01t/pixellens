<script setup lang="ts">
defineProps<{
  title: string;
}>();
const isOpen = ref(true);
</script>

<template>
  <div
    class="min-w-[190px] text-neutral-300 bg-black select-none bg-opacity-50 pl-3 pr-4 py-2 gap-1 flex flex-col items-start"
  >
    <div
      class="flex items-center w-full gap-2 cursor-pointer hover:text-orange-50 transition-all duration-300"
      @click="isOpen = !isOpen"
    >
      <Icon v-if="isOpen == false" class="text-xl" name="pixelarticons:checkbox-on" />
      <Icon v-else class="text-xl" name="pixelarticons:checkbox" />
      <div>{{ title }}</div>
    </div>

    <div v-if="isOpen" class="text-neutral-400">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
