<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos';
import { useEventListener } from '@vueuse/core';
import { reactive, watchEffect } from 'vue';
import { useModelBridge } from '~/composables/model-bridge';

const modelBridge = useModelBridge();
const obj = await modelBridge.getGltfExample();

obj.scale.set(0.2, 0.2, 0.2);

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
  <TresCanvas clear-color="#AAAAAA" shadows preset="realistic">
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <primitive :object="obj" />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="0.5" cast-shadow />
  </TresCanvas>
</template>
