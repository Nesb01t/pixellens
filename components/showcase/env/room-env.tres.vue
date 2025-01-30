<script setup lang="ts">
import { Environment } from '@tresjs/cientos';
import { SRGBColorSpace } from 'three';
</script>

<template>
  <Suspense>
    <Environment
      background
      :encoding="SRGBColorSpace"
      :far="23"
      :files="[
        '/textures/room-env/nx.png',
        '/textures/room-env/ny.png',
        '/textures/room-env/pz.png',
        '/textures/room-env/nz.png',
        '/textures/room-env/px.png',
        '/textures/room-env/py.png',
      ]"
    />
  </Suspense>
</template>

<style scoped lang="scss"></style>
