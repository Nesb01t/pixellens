<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import Machine from '~/components/showcase/machine.tres.vue';
import { useThemeStore } from '~/stores/theme';
import MinecraftEnv from '~/components/showcase/env/minecraft-env.tres.vue';
import StarEnv from '~/components/showcase/env/star-env.tres.vue';

const themeStore = useThemeStore();

const { sceneEnv } = storeToRefs(themeStore);

const yRotation = shallowRef(0);
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.03 * delta;
});

const envLightMultiplier = computed(() => {
  switch (sceneEnv.value) {
    case SceneEnvType.STARS:
      return 1;
    case SceneEnvType.SKY:
      return 0.4;
    case SceneEnvType.OCEAN:
      return 0.8;
  }
});

const aref = ref();
onMounted(() => {
  console.log(aref.value);
});
</script>

<template>
  <TresCanvas clear-color="#1a1a1a" preset="realistic">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls make-default />
    <TresGridHelper ref="aref" :size="10" :divisions="10" material-color="#D3BBA1" />

    <!-- items -->
    <Machine />
    <Stars
      v-if="sceneEnv === SceneEnvType.STARS"
      :rotation="[0, yRotation, 0]"
      :radius="150"
      :depth="50"
      :count="3000"
      :size="0.3"
      :size-attenuation="true"
    />

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
    <MinecraftEnv v-if="sceneEnv === SceneEnvType.SKY" />
  </TresCanvas>
</template>

<style scoped lang="scss"></style>
