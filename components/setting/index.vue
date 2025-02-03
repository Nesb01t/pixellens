<script lang="ts" setup>
import { SceneEnvType, storeToRefs, useThemeStore } from '#build/imports';

const envList = [
  {
    name: '无暇星空',
    type: SceneEnvType.STARS,
    icon: 'pixelarticons:moon-star',
  },
  {
    name: '试炼密室',
    type: SceneEnvType.ROOM,
    icon: 'pixelarticons:wind',
  },
  {
    name: '静谧森林',
    type: SceneEnvType.ASHEN,
    icon: 'pixelarticons:sun-alt',
  },
  {
    name: '香草时光',
    type: SceneEnvType.VANILLA,
    icon: 'pixelarticons:cloud',
  },
];

const { sceneEnv } = storeToRefs(useThemeStore());
</script>

<template>
  <div class="scene-env">
    <h2 class="flex items-center opacity-75 gap-2">
      <Icon name="pixelarticons:chess" />
      <span class="text-[15px] select-none">选择环境</span>
    </h2>
    <ul class="env-list">
      <li
        v-for="(e, idx) in envList"
        :key="idx"
        :class="{ 'active-item': sceneEnv === e.type }"
        @click="sceneEnv = e.type"
      >
        <Icon class="w-[18px]" :name="e.icon" />
        <span class="text-[12px]">{{ e.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.scene-env {
  @apply flex flex-col gap-2;
}

.env-list {
  @apply flex gap-2 w-full flex-wrap;

  li {
    @apply cursor-pointer hover:border-orange-500/50 transition-all duration-300 active:scale-95 select-none items-center flex gap-2 border border-neutral-600/50 px-2 py-1;
  }

  .active-item {
    @apply border-orange-500/80;
  }
}
</style>
