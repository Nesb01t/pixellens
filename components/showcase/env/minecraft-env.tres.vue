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
        '/textures/minecraft-env/nx.png',
        '/textures/minecraft-env/ny.png',
        '/textures/minecraft-env/pz.png',
        '/textures/minecraft-env/nz.png',
        '/textures/minecraft-env/px.png',
        '/textures/minecraft-env/py.png',
      ]"
    />
  </Suspense>
</template>

<style scoped lang="scss"></style>
