<script setup lang="ts">
const { sidebarOpened } = useLayout();

const width = computed(() => {
  return sidebarOpened.value ? '180px' : '60px';
});

interface MenuItem {
  icon: string;
  title: string;
  route: string;
}
const list: MenuItem[] = [
  { icon: 'pixelarticons:script', title: '科技树', route: '/tech-tree' },
  { icon: 'pixelarticons:command', title: '功能', route: '/features' },
  { icon: 'pixelarticons:bulletlist', title: '设置', route: '/settings' },
];
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <span v-if="sidebarOpened">MachineHub</span>
      <span v-else>MH</span>
    </div>

    <ul class="list">
      <li v-for="item in list" :key="item.title">
        <Icon class="text-2xl" :name="item.icon" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply transition-all bg-black bg-opacity-85 text-white flex flex-col items-center pt-4;

  width: v-bind(width);
  min-width: v-bind(width);
}

.logo {
  @apply text-lg font-semibold text-neutral-300;
}

.list {
  @apply mt-6 flex items-center w-full px-4 flex-col gap-1;

  li {
    @apply transition-all select-none duration-150 inline-flex justify-between w-full items-center px-4 text-gray-300 py-2 cursor-pointer;

    &:hover {
      @apply bg-neutral-700 scale-105;
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
