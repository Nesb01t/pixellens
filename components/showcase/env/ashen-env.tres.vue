<script setup lang="ts">
import { Environment } from '@tresjs/cientos';
import { SRGBColorSpace } from 'three';
</script>

<template>
  <Suspense>
    <Environment
      background
      :encoding="SRGBColorSpace"
      :far="120"
      :files="[
        '/textures/ashen-env/panorama_1.png',
        '/textures/ashen-env/panorama_3.png',
        '/textures/ashen-env/panorama_4.png',
        '/textures/ashen-env/panorama_5.png',
        '/textures/ashen-env/panorama_0.png',
        '/textures/ashen-env/panorama_2.png',
      ]"
    />
  </Suspense>
</template>

<style scoped lang="scss"></style>
