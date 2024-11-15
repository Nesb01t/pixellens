<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { useEventListener } from '@vueuse/core';
import { reactive, watchEffect } from 'vue';
import { useModelBridge } from '~/composables/model-bridge';

const modelBridge = useModelBridge();
const obj = await modelBridge.getGltfExample();

obj.scale.set(0.18, 0.18, 0.18);

const state = reactive({
  objPositionX: 0,
  objPositionY: 0,
  objPositionZ: 0,
  wireframe: false,
});

watchEffect(() => {
  obj.position.x = state.objPositionX;
  obj.position.y = state.objPositionY;
  obj.position.z = state.objPositionZ;
});

useEventListener('resize', () => {});
</script>

<template>
  <TresCanvas clear-color="#AAAAAA" preset="realistic">
    <TresPerspectiveCamera :position="[1, 7, 1]" />
    <OrbitControls />
    <primitive :object="obj" />
    <TresAmbientLight :intensity="0.2" />
    <TresGridHelper :size="10" :divisions="10" />
  </TresCanvas>
</template>
