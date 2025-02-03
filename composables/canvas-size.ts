import { useTresContext, useLoop } from '@tresjs/core';
import { useWindowSize } from '@vueuse/core';
import type { Vector2Like } from 'three';
import { watch, ref } from 'vue';

export const useCanvasSize = () => {
  const context = useTresContext();
  const windowSize = useWindowSize();
  const { onBeforeRender } = useLoop();

  const getCanvasSize = () => {
    width.value = context.renderer.value.domElement.clientWidth;
    height.value = context.renderer.value.domElement.clientHeight;
  };

  const isMouseEventSet = ref(false);
  const setMouseEvent = () => {
    if (!isMouseEventSet.value) {
      context.renderer.value.domElement.addEventListener('mousemove', onMouseMove, false);
    }
  };
  const onMouseMove = (event: any) => {
    clientX.value = event.offsetX;
    clientY.value = event.offsetY;
  };
  onBeforeRender(() => {
    if (!width.value || !height.value) {
      getCanvasSize();
    }
    setMouseEvent();
  });

  watch(() => windowSize.width.value, getCanvasSize);

  const getMouseViewportVector = (): Vector2Like => {
    return {
      x: (clientX.value / width.value) * 2 - 1,
      y: -(clientY.value / height.value) * 2 + 1,
    };
  };

  const width = ref();
  const height = ref();
  const clientX = ref();
  const clientY = ref();

  return {
    width,
    height,
    clientX,
    clientY,
    getMouseViewportVector,
  };
};
