import { useTresContext, useLoop } from '@tresjs/core';
import { DepthFormat, UnsignedShortType } from 'three';
import { ref } from 'vue';
import { setupRenderTarget } from '~/components/showcase/render-target/setup';

export const useDepthTexture = () => {
  const context = useTresContext();

  const { onBeforeRender } = useLoop();

  const params = {
    format: DepthFormat,
    type: UnsignedShortType,
    samples: 0,
  };

  const tDepth = ref();

  onBeforeRender(() => {
    if (!tDepth.value) {
      tDepth.value = setupRenderTarget(context.renderer, {
        width: context.renderer.value.domElement.width,
        height: context.renderer.value.domElement.height,
        ...params,
      });
    }
  });

  return { tDepth };
};
