import {
  WebGLRenderTarget,
  NearestFilter,
  DepthTexture,
  DepthStencilFormat,
  UnsignedIntType,
  FloatType,
  DepthFormat,
  UnsignedShortType,
} from 'three';

export interface RTParams {
  format: any;
  type: any;
  samples: any;

  width: any;
  height: any;
}

export const formats = { DepthFormat: DepthFormat, DepthStencilFormat: DepthStencilFormat };
export const types = {
  UnsignedShortType: UnsignedShortType,
  UnsignedIntType: UnsignedIntType,
  FloatType: FloatType,
};

export const setupRenderTarget = (renderer: any, params: RTParams) => {
  const format = parseInt(params.format);
  const type = parseInt(params.type);
  const samples = parseInt(params.samples);
  const width = parseInt(params.width);
  const height = parseInt(params.height);

  const target = new WebGLRenderTarget(width, height);
  target.texture.minFilter = NearestFilter;
  target.texture.magFilter = NearestFilter;
  target.texture.generateMipmaps = false;
  target.stencilBuffer = format === DepthStencilFormat ? true : false;
  target.samples = samples;

  target.depthTexture = new DepthTexture(width, height);
  target.depthTexture.format = format as any;
  target.depthTexture.type = type as any;
  return target;
};
