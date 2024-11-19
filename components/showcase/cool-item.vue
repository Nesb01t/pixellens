<script setup lang="ts">
const modelBridge = useModelBridge();
const obj = await modelBridge.getGltfExample();
</script>

<template>
  <template v-if="obj">
    <primitive :object="obj" />
  </template>
</template>
