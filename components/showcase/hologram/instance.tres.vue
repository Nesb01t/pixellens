<script setup lang="ts">
import { MeshBasicMaterial, Vector3, GreaterDepth, OneFactor, ZeroFactor, CustomBlending, Color } from 'three';
import { computed } from 'vue';
import type { IHologramTip } from '~/types/machine';

const props = defineProps<{
  data: IHologramTip;
}>();

const position = computed<Vector3>(() => {
  const vecP = props.data.position;
  return new Vector3(vecP.x, vecP.y, vecP.z);
});

const plainColorMatProps = {
  baseMaterial: MeshBasicMaterial,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.82, 0.7, 0.45, 1);
    }
    `,
};

const transparentMatProps = {
  baseMaterial: MeshBasicMaterial,
  name: '你好',
  userData: props.data,
  transparent: true,
  depthWrite: true,
  depthTest: true,
  depthFunc: GreaterDepth,
  blending: CustomBlending,
  blendSrc: OneFactor,
  blendDst: ZeroFactor,
  uniforms: {
    u_Time: { value: 0 },
    u_FresnelPower: { value: 1.5 },
    u_FresnelColor: { value: new Color(0.72, 0.7, 0.7) },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;

      vNormal = normalize(normalMatrix * normal); // world space 法线
      vViewDir = normalize(-viewPosition.xyz); // 相机 -> 顶点

      gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform vec3 u_FresnelColor;
    uniform float u_FresnelPower;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(vViewDir);

      float fresnel = pow(1.0 - max(dot(N, V), 0.7), u_FresnelPower);
      float oneMinus = 1.0 - fresnel;

      gl_FragColor = vec4(u_FresnelColor * oneMinus, pow(oneMinus, 0.7));
    }
    `,
};
</script>

<template>
  <TresMesh :render-order="5" :position="position" name="你好">
    <TresSphereGeometry :args="[0.07, 32, 32]" />
    <TresShaderMaterial v-bind="transparentMatProps" />
  </TresMesh>
  <TresMesh :position="position" name="你好的描边" :user-data="data">
    <TresSphereGeometry :args="[0.11, 32, 32]" />
    <TresShaderMaterial v-bind="plainColorMatProps" />
  </TresMesh>
</template>

<style lang="scss" scoped></style>
