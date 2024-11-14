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
  { icon: '🌲', title: '科技树', route: '/tech-tree' },
  { icon: '🔧', title: '功能', route: '/features' },
  { icon: '⚙️', title: '设置', route: '/settings' },
];
</script>

<template>
  <div class="sidebar">
    <UiPattern class="container">
      <div class="logo">
        <span v-if="sidebarOpened">MachineHub</span>
        <span v-else>MH</span>
      </div>

      <ul class="list">
        <li v-for="item in list" :key="item.title">
          <span>{{ item.icon }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </UiPattern>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply transition-all border-r border-neutral-300;

  width: v-bind(width);
  min-width: v-bind(width);
}

.logo {
  @apply text-xl font-semibold;
}

.list {
  @apply mt-6 flex items-center w-full px-4 flex-col gap-2;

  li {
    @apply transition-all select-none duration-150 inline-flex justify-between w-full items-center bg-slate-500 bg-opacity-15 rounded-xl pr-4 pl-2 text-gray-700 py-2 cursor-pointer;
  }

  li:active {
    @apply bg-slate-500 bg-opacity-35 scale-95;
  }
}

.container {
  @apply flex items-center justify-start pt-6 flex-col;
}
</style>
