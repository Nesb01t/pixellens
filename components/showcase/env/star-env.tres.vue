<script setup lang="ts">
import { SRGBColorSpace } from 'three';
import { Environment } from '@tresjs/cientos';
</script>

<template>
  <Suspense>
    <Environment
      background
      :encoding="SRGBColorSpace"
      :far="120"
      :files="[
        '/textures/blank.png',
        '/textures/blank.png',
        '/textures/blank.png',
        '/textures/blank.png',
        '/textures/blank.png',
        '/textures/blank.png',
      ]"
    />
  </Suspense>
</template>

<style scoped lang="scss"></style>
