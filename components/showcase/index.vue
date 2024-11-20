<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import Drawer from '~/components/drawer/index.vue';

const modelStore = useModelStore();

const loaded = computed(() => modelStore.scene !== null);
const loadingOpacityClass = computed(() => (loaded.value ? 'opacity-0' : 'opacity-100'));

onMounted(() => {
  modelStore.selectScene('base1');
});
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
        Loading...
      </div>
    </div>
    <TresCanvas v-if="loaded" clear-color="#1a1a1a" preset="realistic">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls make-default />
      <TresGridHelper :size="10" :divisions="10" />

      <!-- items -->
      <primitive :object="modelStore.scene" />

      <!-- env -->
      <Stars :rotation="[0, 0, 0]" :radius="50" :depth="50" :count="2000" :size="0.3" :size-attenuation="true" />
      <TresAmbientLight :intensity="0.2" />

      <!-- light & shadow -->
      <TresDirectionalLight shadow-bias="-0.0005" cast-shadow :position="[-3, 4, 0]" :intensity="0.35" />
      <TresDirectionalLight shadow-bias="-0.0005" cast-shadow :position="[1, 2, -0.5]" :intensity="0.7" />
    </TresCanvas>

    <Drawer />
    <ShowcaseHelper />
  </div>
</template>
