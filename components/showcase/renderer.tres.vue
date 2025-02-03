<script setup lang="ts">
import { useLoop } from '@tresjs/core';
import { useDepthTexture } from '~/composables/depth-texture';

const { tDepth } = useDepthTexture();

const { render } = useLoop();

render(({ renderer, scene, camera }) => {
  renderer.setRenderTarget(tDepth.value);
  renderer.render(scene, camera);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls make-default />
  <TresGridHelper :size="10" :divisions="10" material-color="#D3BBA1" />
</template>

<style lang="scss" scoped></style>
