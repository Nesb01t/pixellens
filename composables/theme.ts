export type HubTheme = 'light' | 'dark';

export const useTheme = () => {
  const theme = ref<HubTheme>('light');

  return {
    theme,
  };
};
