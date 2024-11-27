<script setup lang="ts">
import type { IMachine } from '~/types/machine';

const props = defineProps<{
  machine: IMachine;
}>();

const gametipStore = useGameTipStore();
const layoutStore = useLayoutStore();
const modelStore = useModelStore();

const enter = () => {
  gametipStore.setGameTipContent(unref(props.machine));

  gametipStore.setVisible(true);
};

const leave = () => {
  gametipStore.setVisible(false);
};

const click = () => {
  const fileName = props.machine.private?.fileName;
  if (!fileName) {
    return;
  }

  modelStore.selectScene(fileName);
  layoutStore.openDrawer('utils');
  leave();
};
</script>

<template>
  <div class="achievement-card" @mouseenter="enter" @mouseleave="leave" @click="click">
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
