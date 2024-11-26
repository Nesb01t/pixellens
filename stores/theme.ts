export enum SceneEnvType {
  STARS,
  SKY,
  OCEAN,
}

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<'light' | 'dark'>('dark');
    const sceneEnv = ref<SceneEnvType>(SceneEnvType.STARS);
    return { theme, sceneEnv };
  },
  {
    persist: true,
  },
);
