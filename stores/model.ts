import type { Scene } from 'three';
import type { ModelName } from '~/composables/model-bridge';
import dayjs from 'dayjs';

export const DEFAULT_MODEL = 'base2.简易皮革机';
export const useModelStore = defineStore('model', () => {
  const scene = shallowRef<Scene | null>(null);
  const modelName = ref<ModelName | null>(localStorage.getItem('modelName') || null);
  const lastScene = shallowRef<Scene | null>(null);
  const lastToggleTime = ref(dayjs());
  const status = ref<'loading' | 'loaded' | 'transmoging' | 'error'>('loaded');

  const selectScene = async (newModelName: ModelName | null) => {
    if (!newModelName || status.value === 'loading' || status.value === 'transmoging') {
      return;
    }
    console.log(JSON.stringify(newModelName));
    modelName.value = newModelName;
    localStorage.setItem('modelName', newModelName as string);
    try {
      status.value = 'loading';
      lastScene.value = scene.value ? scene.value.clone() : null;
      scene.value = await useModelBridge().getParsedModel(newModelName);
      status.value = 'transmoging';
      await castToggleAnimation();
      status.value = 'loaded';
    } catch {
      status.value = 'error';
    }
  };

  const loadScene = async () => {
    try {
      await selectScene(modelName.value);
    } catch {
      await selectScene(DEFAULT_MODEL);
    }
  };

  const ANIME_DURATION = 500;
  const ANIME_FPS = 150;
  const BASE_MODEL_SCALE = 0.4;
  const MAX_UPWARD_DISPLACEMENT = 0.15;

  const castToggleAnimation = async () => {
    lastToggleTime.value = dayjs();
    while (dayjs().diff(lastToggleTime.value, 'ms') < ANIME_DURATION) {
      const elapsed = dayjs().diff(lastToggleTime.value, 'ms');
      if (lastScene.value) {
        const scaleMultiplier = ensureFloorPositive(0.9 - elapsed / ANIME_DURATION);
        const easedMultiplier = easeOut(scaleMultiplier) * BASE_MODEL_SCALE;
        lastScene.value.scale.set(easedMultiplier, easedMultiplier, easedMultiplier);

        const upwardDisplacement = easeIn(elapsed / ANIME_DURATION) * MAX_UPWARD_DISPLACEMENT;
        lastScene.value.position.y += upwardDisplacement;
      }
      if (scene.value) {
        const scaleSceneMultiplier = easeIn(elapsed / ANIME_DURATION);
        const scaledSize = scaleSceneMultiplier * BASE_MODEL_SCALE;

        scene.value.scale.set(scaledSize, scaledSize, scaledSize);

        const initialPositionY = -MAX_UPWARD_DISPLACEMENT * 15;
        const upwardMovement = easeOut(elapsed / ANIME_DURATION) * MAX_UPWARD_DISPLACEMENT * 15;
        scene.value.position.y = initialPositionY + upwardMovement;
      }
      await new Promise((resolve) => setTimeout(resolve, ANIME_DURATION / ANIME_FPS));
    }
    lastScene.value = null;
  };

  return {
    scene,
    lastScene,
    modelName,
    status,
    selectScene,
    loadScene,
  };
});

export const ensureFloorPositive = (n: number) => {
  if (n < 0) {
    return 0;
  }
  return n;
};

export const easeInOut = (t: number) => {
  if (t < 0.5) {
    return 2 * t * t;
  } else {
    return -1 + (4 - 2 * t) * t;
  }
};

export const easeOutIn = (t: number) => {
  if (t < 0.5) {
    return 0.5 * (1 - Math.pow(1 - 2 * t, 2));
  } else {
    return 0.5 * Math.pow(2 * (t - 0.5), 2) + 0.5;
  }
};

export const easeIn = (t: number) => {
  return t * t;
};

export const easeOut = (t: number) => {
  return 1 - Math.pow(1 - t, 2);
};
