<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import Drawer from '~/components/drawer/index.vue';

const modelBridge = useModelBridge();
const obj = await modelBridge.getGltfExample();
</script>

<template>
  <div class="w-full h-full relative">
    <TresCanvas clear-color="#080808" preset="realistic">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls make-default />
      <TresGridHelper :size="10" :divisions="10" />

      <!-- items -->
      <primitive :object="obj" />

      <!-- env -->
      <Stars :rotation="[0, 0, 0]" :radius="50" :depth="50" :count="2000" :size="0.3" :size-attenuation="true" />
      <TresAmbientLight :intensity="0.2" />

      <!-- light & shadow -->
      <TresDirectionalLight shadow-bias="-0.0005" cast-shadow :position="[-3, 4, 0]" :intensity="0.35" />
      <TresDirectionalLight shadow-bias="-0.0005" cast-shadow :position="[1, 2, -0.5]" :intensity="0.7" />
    </TresCanvas>

    <Drawer />
    <ShowcaseHelper />
  </div>
</template>
