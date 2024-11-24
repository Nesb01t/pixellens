export const useGameTipStore = defineStore('gametip', () => {
  const visible = ref<boolean>(false);

  const gametipContent = reactive({
    title: '刷铁机',
    tag: '基础',
    description: '版本初期',
  });
  const setVisible = (newVal: boolean) => {
    visible.value = newVal;
  };

  return {
    visible,
    gametipContent,
    setVisible,
  };
});
