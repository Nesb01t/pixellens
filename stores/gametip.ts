import { defineStore } from '#build/imports';
import { ref } from 'vue';
import type { IMachine } from '~/types/machine';

export const useGameTipStore = defineStore('gametip', () => {
  const visible = ref<boolean>(false);

  const raycastContent = ref<any>();
  const gametipContent = ref<IMachine | null>(null);

  const setVisible = (newVal: boolean) => {
    visible.value = newVal;
  };

  const setRaycastContent = (newVal: any) => {
    raycastContent.value = newVal;
  };

  const setGameTipContent = (newVal: IMachine | string) => {
    gametipContent.value = newVal;
  };

  return {
    visible,
    gametipContent,
    raycastContent,
    setVisible,
    setGameTipContent,
    setRaycastContent,
  };
});
