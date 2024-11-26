<script setup lang="ts">
import { computed } from 'vue';
import { useMouse } from '@vueuse/core';

const gametipStore = useGameTipStore();

const { gametipContent } = storeToRefs(gametipStore);

const opacityClass = computed(() => {
  return gametipStore.visible ? 'opacity-100' : 'opacity-0';
});

const textOpacityTransClass = ref('opacity-0');
watch(gametipContent, () => {
  textOpacityTransClass.value = 'opacity-0';
  setTimeout(() => {
    textOpacityTransClass.value = 'opacity-100 transition-all duration-[360ms]';
  }, 33);
});

const { x, y } = useMouse();

const position = computed(() => {
  return {
    x: x.value + 15 + 'px',
    y: y.value + 'px',
  };
});

const transXClass = computed(() => {
  return gametipStore.visible ? 'left-0' : 'left-[30px]';
});
</script>

<template>
  <div class="gametip-wrapper">
    <div class="gametip-content" :class="[transXClass, opacityClass].join(' ')">
      <header class="flex items-end gap-1">
        <h1 class="text-base text-neutral-300" :class="textOpacityTransClass">{{ gametipContent?.name }}</h1>
        <h2 class="text-sm text-neutral-500" :class="textOpacityTransClass">{{ gametipContent?.category }}</h2>
      </header>

      <div class="border-b w-full opacity-15 my-2" />
      <div class="text-neutral-600 text-sm text-nowrap" :class="textOpacityTransClass">
        <div v-for="(d, idx) in gametipContent?.descriptions" :key="idx">{{ d }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gametip-wrapper {
  @apply absolute z-[100];
  left: v-bind('position.x');
  top: v-bind('position.y');
}

.gametip-content {
  @apply absolute px-3 py-2 text-white/50 text-sm transition-all duration-300 min-w-[200px] min-h-[120px] border border-neutral-400/30 backdrop-blur-sm bg-black/50;
}
</style>
