<script setup lang="ts">
import { storeToRefs } from '#build/imports';
import { computed } from 'vue';
import Drawer from '~/components/drawer/index.vue';
import Scene from '~/components/showcase/scene.tres.vue';
import { useModelStore } from '~/stores/model';

const modelStore = useModelStore();

const { status } = storeToRefs(modelStore);

const loadingOpacityClass = computed(() =>
  status.value == 'loaded' || status.value == 'transmoging' ? 'opacity-0' : 'opacity-100',
);
</script>

<template>
  <div class="w-full h-full relative">
    <div
      :class="loadingOpacityClass"
      class="absolute inline-flex gap-3 transition-all duration-500 pointer-events-none tracking-wide z-10 top-0 left-0 w-full h-full items-center justify-center bg-[#111] text-white"
    >
      <Icon class="text-2xl opacity-70" name="eos-icons:bubble-loading" />
      <div
        class="text-2xl font-semibold bg-gradient-to-r text-transparent from-slate-50 via-orange-400 to-transparent bg-clip-text opacity-75"
      >
        {{ status == 'error' ? '模型尚未支持或网络出错' : 'Loading...' }}
      </div>
    </div>

    <Scene />
    <Drawer />
    <Helper />
  </div>
</template>
