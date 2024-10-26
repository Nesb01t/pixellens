<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { Pane } from 'tweakpane';
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

const pane = new Pane();
pane.addBinding(state, 'objPositionX', { min: -10, max: 10 });
pane.addBinding(state, 'objPositionY', { min: -10, max: 10 });
pane.addBinding(state, 'objPositionZ', { min: -10, max: 10 });

watchEffect(() => {
  fbxObject.position.x = state.objPositionX;
  fbxObject.position.y = state.objPositionY;
  fbxObject.position.z = state.objPositionZ;
});
</script>

<template>
  <TresCanvas clear-color="#82dbc5">
    <primitive :object="fbxObject" />
    <TresPerspectiveCamera :position="[9, 9, 9]" />
    <OrbitControls />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
  </TresCanvas>
</template>
