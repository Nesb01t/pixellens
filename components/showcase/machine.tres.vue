<script setup lang="ts">
import { useModelStore, storeToRefs } from '#build/imports';
import { onMounted } from 'vue';

const modelStore = useModelStore();
const { scene, lastScene } = storeToRefs(modelStore);

onMounted(() => {
  modelStore.loadScene();
});
</script>

<template>
  <primitive v-if="scene" :object="scene" />
  <primitive v-if="lastScene" :object="lastScene" />
</template>

<style scoped lang="scss"></style>
