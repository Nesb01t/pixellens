<script setup lang="ts">
import type { IHologramTip } from '~/types/machine';
import Instance from './instance.tres.vue';
import { useModelStore, storeToRefs } from '#build/imports';
import { ref, watch } from 'vue';

const modelStore = useModelStore();
const { machine, scene } = storeToRefs(modelStore);

interface TipDirective {
  data: IHologramTip;
  disposeDirective: boolean;
}
const appendedTips = ref<TipDirective[]>([]);

watch(scene, () => {
  for (const tip of appendedTips.value) {
    tip.disposeDirective = false;
  }

  for (const tip of machine.value?.tips || []) {
    if (!appendedTips.value.find((t) => t.data.content === tip.content)) {
      // 没找到就添加 tips
      appendedTips.value.push({ data: tip, disposeDirective: true });
    } else {
      const tipDirective = appendedTips.value.find((t) => t.data.content === tip.content);
      if (tipDirective) {
        tipDirective.disposeDirective = true;
      }
    }
  }
});
</script>

<template>
  <template v-for="(t, idx) in appendedTips" :key="idx">
    <Instance :data="t.data" :dispose-directive="t.disposeDirective" />
  </template>
</template>

<style scoped lang="scss"></style>
