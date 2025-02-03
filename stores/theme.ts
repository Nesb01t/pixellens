import { defineStore } from '#build/imports';
import { ref } from 'vue';

export enum SceneEnvType {
  STARS,
  ROOM,
  ASHEN,
  VANILLA,
}

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<'light' | 'dark'>('dark');
    const sceneEnv = ref<SceneEnvType>(SceneEnvType.ASHEN);
    return { theme, sceneEnv };
  },
  {
    persist: true,
  },
);
