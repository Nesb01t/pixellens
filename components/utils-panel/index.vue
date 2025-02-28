<script lang="ts" setup>
import { machines } from '~/assets/data/machines';
import type { IMaterialSet } from '~/types/machine';
import { downloadLitematic, downloadTxt, downloadGlb } from './utils';
import { useModelStore, storeToRefs } from '#build/imports';
import { computed } from 'vue';

const modelStore = useModelStore();

const { materialMap, modelName } = storeToRefs(modelStore);

const isMaterialListAvailable = computed(() => materialMap.value && Object.keys(materialMap.value).length > 0);

const materialsets = computed<IMaterialSet[]>(() => {
  if (!materialMap.value) {
    return [];
  }

  const materialRawContents = Array.from(Object.keys(materialMap.value)).map((b) => {
    return {
      name: b,
      amount: materialMap.value?.[b] || 0,
    };
  });

  return materialRawContents.sort((a, b) => b.amount - a.amount);
});

const blockClick = (m: IMaterialSet) => {
  const name = m.name;
  window.open(`https://search.mcmod.cn/s?key=${name}+我的世界原版`, '_blank');
};

const GenAmountColorClass = (idx: number, length: number): string => {
  const step = Math.floor((5 * (length - idx)) / length) * 100;
  if (step === 0) {
    return 'text-white';
  }
  return `text-orange-${step}`;
};

function extractAfterFirstDot(str: string) {
  const regex = /(?<=\.).*/; // 匹配第一个点后的所有内容
  const match = str.match(regex);
  return match ? match[0] : null; // 如果找到匹配，返回匹配的内容；否则返回null
}

const extractName = computed(() => {
  if (!modelName.value) {
    return '';
  }
  return extractAfterFirstDot(modelName.value);
});

export interface DownloadableStatus {
  litematic?: boolean;
  txt?: boolean;
  glb?: boolean;
}

const downloadableStatus = computed<DownloadableStatus | null>(() => {
  if (!extractName.value) {
    return null;
  }
  return getDownloadableStatus(extractName.value);
});

const getDownloadableStatus = (name: string): DownloadableStatus => {
  return machines.find((m) => m.name === name)?.downloadable || { litematic: false, txt: false, glb: false };
};
</script>

<template>
  <h2 class="flex items-center opacity-75 gap-2">
    <Icon name="pixelarticons:add-box-multiple" />
    <span class="text-[15px] select-none">结构信息</span>
  </h2>

  <div class="text-xs pl-1 opacity-50 mb-4">名称：{{ extractName }}</div>

  <h2 class="flex items-center opacity-75 gap-2">
    <Icon name="pixelarticons:archive" />
    <span class="text-[15px] select-none">材料 / 方块列表</span>
  </h2>
  <div class="pl-1 text-[12px] w-full opacity-50">
    {{ !isMaterialListAvailable ? '该机器暂无材料列表, 待补充...' : '点击材料前往 mcmod 查看详情' }}
  </div>
  <ul v-if="isMaterialListAvailable" class="block-key-list">
    <li v-for="(m, idx) in materialsets" :key="idx" @click="blockClick(m)">
      <label>{{ m.name }}</label>
      <div
        v-if="m.amount !== 0"
        :class="
          [
            GenAmountColorClass(idx, materialsets.length),
            'absolute bottom-0 left-1/2 -translate-x-1/2 text-[20px]',
          ].join(' ')
        "
      >
        {{ m.amount }}
      </div>
      <div v-else class="absolute bottom-0 left-1/2 -translate-x-1/2 text-[20px] opacity-50">??</div>
    </li>
  </ul>
  <h2 v-if="modelName" class="flex items-center opacity-75 gap-2 mt-4">
    <Icon name="pixelarticons:download" />
    <span class="text-[15px] select-none">投影 / 材料表 / 模型</span>
  </h2>

  <ul v-if="modelName" class="download-list">
    <!-- <span class="text-xs text-orange-500/50 mb-1">维护状态可能正常无法下载</span> -->
    <li v-if="downloadableStatus?.litematic" @click="downloadLitematic(modelName)">
      <Icon class="text-lg" name="pixelarticons:script-text" />
      <span>{{ `${extractName}.litematic` }}</span>
    </li>
    <li v-if="isMaterialListAvailable && downloadableStatus?.txt" @click="downloadTxt(modelName)">
      <Icon class="text-lg" name="pixelarticons:align-left" />
      <span>{{ `${extractName}.txt` }}</span>
    </li>
    <li v-if="downloadableStatus?.glb" @click="downloadGlb(modelName)">
      <Icon class="text-lg" name="pixelarticons:human" />
      <span>{{ `${extractName}.glb` }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.block-key-list {
  @apply grid grid-cols-3 gap-1 w-full;

  li {
    @apply text-center text-neutral-300 transition-all duration-300 border-[8px] hover:brightness-[1.35] bg-[#212121] rounded-xl cursor-pointer flex relative aspect-square overflow-hidden;

    border-image: url('~/assets/images/border.png') 8;
  }

  label {
    @apply text-[12px] absolute top-0 left-1/2 -translate-x-1/2 scale-75;
  }
}

ul.download-list {
  @apply flex flex-col gap-[6px] w-full;

  li {
    @apply text-[12px] w-full cursor-pointer hover:border-orange-500/50 transition-all duration-300 active:scale-95 select-none items-center flex gap-2 border border-neutral-600/50 px-[8px] py-[8px];
  }

  .active-item {
    @apply border-orange-500/80;
  }
}

.text-orange-500 {
  color: #f97316;
}

.text-orange-400 {
  color: #f68232;
}

.text-orange-300 {
  color: #f5a46e;
}

.text-orange-200 {
  color: #f1c0a0;
}

.text-orange-100 {
  color: #f5dece;
}
</style>
