<script setup lang="ts"></script>

<template>
  <main class="default-layout">
    <Gametip />
    <UiSidebar />
    <div class="default-layout__content">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.default-layout {
  @apply flex overflow-hidden w-full h-[100vh] relative bg-neutral-800;

  &__content {
    @apply flex-grow flex overflow-hidden;
  }
}
</style>
