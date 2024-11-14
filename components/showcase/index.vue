<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { useEventListener } from '@vueuse/core';
import { reactive, watchEffect } from 'vue';
import { useModelBridge } from '~/composables/model-bridge';

const modelBridge = useModelBridge();
const fbxObject = await modelBridge.getFbxExample();

fbxObject.scale.set(1, 1, 1);

const state = reactive({
  objPositionX: 0,
  objPositionY: 0,
  objPositionZ: 0,
  wireframe: false,
});

watchEffect(() => {
  fbxObject.position.x = state.objPositionX;
  fbxObject.position.y = state.objPositionY;
  fbxObject.position.z = state.objPositionZ;
});

useEventListener('resize', () => {});
</script>

<template>
  <TresCanvas clear-color="#eaeaea" preset="realistic">
    <primitive :object="fbxObject" />
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
  </TresCanvas>
</template>
