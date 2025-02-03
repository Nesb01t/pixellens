<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useMouse } from '@vueuse/core';
import { useGameTipStore } from '~/stores/gametip';
import { storeToRefs } from '#build/imports';

const gametipStore = useGameTipStore();

const { gametipContent, raycastContent } = storeToRefs(gametipStore);

const opacityClass = computed(() => {
  return gametipStore.visible || raycastContent.value !== undefined ? 'opacity-100' : 'opacity-0';
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
  return gametipStore.visible || raycastContent.value !== undefined ? 'left-0' : 'left-[30px]';
});
</script>

<template>
  <div class="gametip-wrapper">
    <div
      v-if="gametipStore.visible"
      class="gametip-content min-w-[200px] min-h-[120px]"
      :class="[transXClass, opacityClass].join(' ')"
    >
      <header class="flex items-end gap-1">
        <h1 class="text-base text-neutral-300" :class="textOpacityTransClass">{{ gametipContent?.name }}</h1>
        <h2 class="text-sm text-neutral-500" :class="textOpacityTransClass">{{ gametipContent?.category }}</h2>
      </header>

      <div class="border-b w-full opacity-15 my-2" />
      <div class="text-neutral-600 text-sm text-nowrap" :class="textOpacityTransClass">
        <div v-for="(d, idx) in gametipContent?.descriptions" :key="idx">{{ d }}</div>
      </div>

      <div class="mt-auto pt-2 text-orange-500/60 flex items-center text-nowrap text-xs" :class="textOpacityTransClass">
        <Icon name="pixelarticons:forward" class="text-xl" />
        点击选择机器并查看详情
      </div>
    </div>

    <div
      v-else-if="raycastContent !== undefined"
      class="gametip-content min-w-[230px] min-h-[50px] py-2 text-center items-center justify-center"
      :class="[transXClass, opacityClass].join(' ')"
    >
      <Icon name="pixelarticons:script-text" class="text-lg text-orange-100 mb-1" />
      <span
        class="text-xs bg-clip-text text-transparent bg-gradient-to-br from-slate-200/70 to-orange-200/70"
        v-html="raycastContent"
      />
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
  @apply absolute flex flex-col px-3 py-2 text-white/50 text-sm transition-all duration-300 border border-neutral-400/30 backdrop-blur-sm bg-black/50;
}
</style>
