<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';

const modelBridge = useModelBridge();
const obj = await modelBridge.getGltfExample();
</script>

<template>
  <div class="w-full h-full relative">
    <TresCanvas clear-color="#333333" preset="realistic">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls make-default />

      <!-- items -->
      <primitive :object="obj" />

      <!-- env -->
      <Stars :rotation="[0, 0, 0]" :radius="50" :depth="50" :count="2000" :size="0.3" :size-attenuation="true" />
      <TresAmbientLight :intensity="0.65" />
      <TresDirectionalLight shadow-bias="-0.0001" cast-shadow :position="[0, 2, 0]" :intensity="0.7" />
      <TresGridHelper :size="10" :divisions="10" />
    </TresCanvas>

    <ShowcaseHelper />
  </div>
</template>
