import { translateMap } from './translate-mapping';

export const translate = (rawName: string) => {
  return translateMap?.[rawName] || rawName;
};

export const translatePatchLogger = {
  isEnabled: true,
  currentSessionWaitTranslateValues: new Set(),
  addValue: (value: string) => {
    translatePatchLogger.currentSessionWaitTranslateValues.add(value);
  },
  logWaitTranslateValues: () => {
    const vals = translatePatchLogger.currentSessionWaitTranslateValues;
    if (vals.size === 0) {
      return;
    }
    console.log(
      `[mh] 以下方块没有对应的中文名, 请帮我翻译成 key: 'value', 这样的格式, 后面是需要翻译的内容 `,
      Array.from(vals).join(', '),
    );
  },
};
