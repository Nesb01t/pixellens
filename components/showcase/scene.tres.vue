<script setup lang="ts">
import Renderer from './renderer.tres.vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import Machine from '~/components/showcase/machine.tres.vue';
import { SceneEnvType, useThemeStore } from '~/stores/theme';
import StarEnv from '~/components/showcase/env/star-env.tres.vue';
import RoomEnv from '~/components/showcase/env/room-env.tres.vue';
import AshenEnv from '~/components/showcase/env/ashen-env.tres.vue';
import VanillaEnv from '~/components/showcase/env/vanilla-env.tres.vue';
import HologramTips from '~/components/showcase/hologram/tips.tres.vue';
import { storeToRefs } from '#build/imports';
import { shallowRef, computed } from 'vue';

const themeStore = useThemeStore();

const { sceneEnv } = storeToRefs(themeStore);

const yRotation = shallowRef(0);
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.03 * delta;
});

const envLightMultiplier = computed(() => {
  switch (sceneEnv.value) {
    case SceneEnvType.STARS:
      return 0.7;
    case SceneEnvType.ROOM:
      return 0.5;
    case SceneEnvType.ASHEN:
      return 0.2;
    default:
      return 0.2;
  }
});
</script>

<template>
  <TresCanvas antialias render-mode="manual" clear-color="#1a1a1a" preset="realistic">
    <Suspense>
      <Renderer />
    </Suspense>

    <!-- items -->
    <Machine />
    <HologramTips />
    <Stars
      v-if="sceneEnv === SceneEnvType.STARS"
      :rotation="[0, yRotation, 0]"
      :radius="150"
      :depth="50"
      :count="3000"
      :size="0.3"
      :size-attenuation="true"
    />

    <!-- light set -->
    <TresAmbientLight :intensity="envLightMultiplier * 0.4" />
    <TresDirectionalLight
      :shadow-bias="-0.00005"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      cast-shadow
      :position="[-3, 4, 0]"
      :intensity="0.3 * envLightMultiplier"
    />
    <TresDirectionalLight
      :shadow-bias="-0.00005"
      :shadow-intensity="1.45"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      cast-shadow
      :position="[1, 1, -0.5]"
      :intensity="0.7 * envLightMultiplier"
    />

    <!-- env -->
    <StarEnv v-if="sceneEnv === SceneEnvType.STARS" />
    <RoomEnv v-if="sceneEnv === SceneEnvType.ROOM" />
    <AshenEnv v-if="sceneEnv === SceneEnvType.ASHEN" />
    <VanillaEnv v-if="sceneEnv === SceneEnvType.VANILLA" />
  </TresCanvas>
</template>

<style scoped lang="scss"></style>
