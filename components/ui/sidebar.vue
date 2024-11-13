<script setup lang="ts">
const { sidebarOpened } = useLayout();

const width = computed(() => {
  return sidebarOpened.value ? '240px' : '60px';
});
</script>

<template>
  <div class="sidebar">OK</div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply flex items-start flex-col border-r border transition-all;

  width: v-bind(width);
  min-width: v-bind(width);
}
</style>
