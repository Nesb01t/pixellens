import { useWindowSize } from '@vueuse/core';

type SidebarStatus = boolean | 'auto';
type DrawerStatus = 'closed' | 'settings' | 'about' | 'help';

export const useLayout = () => {
  const { width: windowWidth } = useWindowSize();

  const isMobile = computed(() => windowWidth.value < 768);

  const sidebarStatus = ref<SidebarStatus>('auto');
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
  const drawerStatus = ref('closed');
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
