<script setup lang="ts">
import Pattern from './pattern.vue';

const layoutStore = useLayoutStore();

const width = computed(() => {
  return layoutStore.sidebarOpened ? '180px' : '50px';
});

const menuPadding = computed(() => {
  return layoutStore.sidebarOpened ? '0 16px' : '0';
});

const itemPadding = computed(() => {
  return layoutStore.sidebarOpened ? '8px 16px' : '8px 0';
});

interface MenuItem {
  icon: string;
  title: string;
  callback?: () => void;
}
const list: MenuItem[] = [
  { icon: 'pixelarticons:script', title: '科技树', callback: () => layoutStore.openDrawer('machine') },
  { icon: 'pixelarticons:command', title: '功能', callback: () => layoutStore.openDrawer('utils') },
  { icon: 'pixelarticons:bulletlist', title: '设置', callback: () => layoutStore.openDrawer('settings') },
];

const bottomList: MenuItem[] = [
  { icon: 'pixelarticons:arrow-bar-left', title: '收起', callback: () => layoutStore.toggleSidebar() },
];
</script>

<template>
  <div class="sidebar">
    <Pattern />
    <div class="logo">
      <span v-if="layoutStore.sidebarOpened">
        <span>Machine</span>
        <span class="text-orange-500">Hub</span>
      </span>
      <span v-else>
        <span>m</span>
        <span class="text-orange-500">h</span>
      </span>
    </div>

    <ul class="list">
      <li v-for="item in list" :key="item.title" @click="item?.callback">
        <Icon class="text-2xl" :name="item.icon" />
        <span v-if="layoutStore.sidebarOpened" class="ml-auto">{{ item.title }}</span>
      </li>

      <div class="mt-auto" />

      <li v-for="item in bottomList" :key="item.title" @click="item?.callback">
        <Icon class="text-2xl" :name="item.icon" />
        <span v-if="layoutStore.sidebarOpened" class="ml-auto">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply relative transition-all text-neutral-200 flex flex-col items-center py-4;

  width: v-bind(width);
  min-width: v-bind(width);
}

.logo {
  @apply select-none text-lg font-semibold text-neutral-300 opacity-95;
}

.list {
  @apply mt-6 flex items-center w-full h-full flex-col gap-2 z-[1];

  padding: v-bind(menuPadding);

  li {
    @apply text-nowrap overflow-hidden transition-all select-none duration-150 inline-flex w-full justify-center items-center text-neutral-300 cursor-pointer;

    padding: v-bind(itemPadding);

    &:hover {
      @apply bg-black bg-opacity-45 scale-105;
    }
  }

  li:active {
    @apply scale-100;
  }
}

.container {
  @apply flex items-center justify-start pt-6 flex-col;
}
</style>
