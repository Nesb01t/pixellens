import { useWindowSize } from '@vueuse/core';

export type SidebarStatus = boolean | 'auto';
export type DrawerStatus = 'closed' | 'settings' | 'tech-tree' | 'utils';

const sidebarStatus = ref<SidebarStatus>('auto');
const drawerStatus = ref<DrawerStatus>('closed');

export const useLayout = () => {
  const { width: windowWidth } = useWindowSize();

  const isMobile = computed(() => windowWidth.value < 768);

  const sidebarOpened = computed(() => {
    if (sidebarStatus.value === 'auto') {
      return !isMobile.value;
    }
    return sidebarStatus.value;
  });

  const toggleSidebar = () => {
    if (sidebarStatus.value === 'auto') {
      sidebarStatus.value = isMobile.value;
    } else {
      sidebarStatus.value = !sidebarStatus.value;
    }
  };

  /**
   * Drawer
   */
  const openDrawer = (drawerPage: DrawerStatus) => {
    drawerStatus.value = drawerPage;
  };

  return {
    windowWidth,
    isMobile,
    sidebarOpened,
    drawerStatus,
    toggleSidebar,
    openDrawer,
  };
};
