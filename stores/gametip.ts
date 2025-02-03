import { defineStore } from '#build/imports';
import { ref } from 'vue';
import type { IMachine } from '~/types/machine';

export const useGameTipStore = defineStore('gametip', () => {
  const visible = ref<boolean>(false);

  const gametipContent = ref<IMachine | null>(null);

  const setVisible = (newVal: boolean) => {
    visible.value = newVal;
  };

  const setGameTipContent = (newVal: IMachine) => {
    gametipContent.value = newVal;
  };

  return {
    visible,
    gametipContent,
    setVisible,
    setGameTipContent,
  };
});
