<script setup lang="ts">
import manager from '../litematic/manager.vue';
const layoutStore = useLayoutStore();
const bufferedDrawerStatus = ref<DrawerStatus>('closed');
const bufferLock = ref(false);
watch(
  () => layoutStore.drawerStatus,
  (status) => {
    if (bufferLock.value) {
      return;
    }
    bufferedDrawerStatus.value = 'closed';
    bufferLock.value = true;
    setTimeout(() => {
      bufferedDrawerStatus.value = status;
      bufferLock.value = false;
    }, 300);
  },
  { immediate: true },
);

const close = () => {
  layoutStore.drawerStatus = 'closed';
};

const isOpen = computed(() => {
  return bufferedDrawerStatus.value !== 'closed';
});

const castMaxWidthAnimeClass = computed(() => {
  return isOpen.value ? 'max-w-[270px] min-w-[270px]' : 'max-w-[0px] min-w-[0px]';
});

const castOpacityAnimeClass = computed(() => {
  return isOpen.value ? 'opacity-100' : 'opacity-0';
});

interface DrawerContent {
  title: string;
  content: string;
  subComponents?: InstanceType<any>;
}

const drawerContent: Record<DrawerStatus, DrawerContent | undefined> = {
  closed: undefined,
  settings: {
    title: '设置',
    content: '选择主题 / 配置参数',
  },
  utils: {
    title: '功能',
    content: '计划添加中, 欢迎建议 !',
  },
  machine: {
    title: '机器',
    content: '仍在补充和分类中...',
    subComponents: manager,
  },
};
</script>

<template>
  <div
    :class="[castMaxWidthAnimeClass, castOpacityAnimeClass].join(' ')"
    class="w-full h-full transition-all duration-300 ease-out absolute overflow-hidden text-nowrap left-0 top-0 gradient-trans text-neutral-400"
  >
    <div class="w-full h-full flex flex-col items-start px-6 py-4 gap-2">
      <div class="inline-flex items-center w-full h-[32px]">
        <h1
          class="text-2xl tracking-wide select-none font-semibold text-transparent bg-clip-text bg-gradient-to-br from-orange-50 to-neutral-600 opacity-75"
        >
          {{ drawerContent[bufferedDrawerStatus]?.title }}
        </h1>
        <Icon
          class="text-2xl text-neutral-400 transition-all duration-300 hover:text-orange-500 ml-auto cursor-pointer"
          name="pixelarticons:close"
          @click="close"
        />
      </div>

      <p
        class="text-lg tracking-wide select-none font-light text-transparent bg-clip-text bg-gradient-to-br from-orange-50 to-neutral-600 opacity-75"
      >
        {{ drawerContent[bufferedDrawerStatus]?.content }}
      </p>

      <div class="border-t w-[70%] opacity-15 mt-1 mb-3" />
      <component
        :is="drawerContent[bufferedDrawerStatus]?.subComponents"
        v-if="drawerContent[bufferedDrawerStatus]?.subComponents"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gradient-trans {
  background: linear-gradient(100deg, black, #111 50%, transparent 100%);
}
</style>
