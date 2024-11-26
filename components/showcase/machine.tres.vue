<script setup lang="ts">
const modelStore = useModelStore();
const { scene, lastScene, modelName } = storeToRefs(modelStore);

onMounted(() => {
  modelStore.loadScene();
});
</script>

<template>
  <primitive v-if="scene" :object="scene" />
  <primitive v-if="lastScene" :object="lastScene" />
</template>

<style scoped lang="scss"></style>
