import type { Scene } from 'three';
import type { ModelName } from '~/composables/model-bridge';

export const useModelStore = defineStore('model', () => {
  const scene = shallowRef<Scene | null>(null);

  const selectScene = async (newModelName: ModelName) => {
    const newScene = await useModelBridge().getParsedModel(newModelName);
    scene.value = newScene;
  };

  return {
    scene,
    selectScene,
  };
});
